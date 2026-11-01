// GitHub automated sync service for Rishiraj Debnath (13507-IN)
// Fetches repositories, parses README for banners and live links, and caches locally to avoid rate limits.

const GITHUB_USERNAME = '13507-IN';
const CACHE_KEY = 'github_portfolio_cache_v2';
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour cache

// Repositories to exclude from portfolio showcase
const EXCLUDED_REPOS = new Set([
  'portfolio',
  '13507-IN',
  'campuskart-redirect',
  'ATP',
]);

/**
 * Format repository name for display (e.g. "Prompt_Mastry" -> "Prompt Mastery")
 */
export function formatRepoTitle(name) {
  if (!name) return '';
  const customNames = {
    'Rishiraj-Auth': 'Rishiraj Auth',
    'Prompt_Mastry': 'Prompt Mastery',
    'GoWavy_WOP': 'GoWavy',
    'Manage-master': 'Life Manager',
    'FitAura': 'FitAura AI',
    'InceptIQ': 'InceptIQ',
    'Funfy': 'Funfy',
    'Clip': 'Clip',
    'ScholarCatalyst': 'ScholarCatalyst',
    'MediOps': 'MediOps',
    'PujoPokkho': 'PujoPokkho',
    'StepClaim': 'StepClaim',
    'CommunitySync': 'CommunitySync',
  };

  if (customNames[name]) return customNames[name];

  return name
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim();
}

/**
 * Infer project category from repository language, topics, and description
 */
export function inferCategory(repo) {
  const topics = (repo.topics || []).map((t) => t.toLowerCase());
  const lang = (repo.language || '').toLowerCase();
  const desc = (repo.description || '').toLowerCase();

  if (
    lang === 'rust' ||
    lang === 'go' ||
    topics.includes('backend') ||
    topics.includes('api') ||
    desc.includes('backend') ||
    desc.includes('api') ||
    desc.includes('auth') ||
    desc.includes('url shortener')
  ) {
    return 'Backend';
  }

  if (
    topics.includes('frontend') ||
    topics.includes('css') ||
    topics.includes('ui') ||
    desc.includes('sticker') ||
    desc.includes('canvas')
  ) {
    return 'Frontend';
  }

  return 'Full Stack';
}

/**
 * Checks if an image URL is a badge or status icon rather than a real screenshot
 */
function isBadgeUrl(url) {
  if (!url) return true;
  const lower = url.toLowerCase();
  return (
    lower.includes('shields.io') ||
    lower.includes('badgen.net') ||
    lower.includes('badge.svg') ||
    lower.includes('/badge/') ||
    lower.includes('travis-ci') ||
    lower.includes('circleci') ||
    lower.includes('codecov') ||
    lower.includes('github-readme-stats')
  );
}

/**
 * Extract the first real screenshot/image URL and live link from raw README markdown
 */
export function parseReadme(rawMarkdown, repoName, defaultBranch = 'main') {
  if (!rawMarkdown) return { imageUrl: null, extractedLiveLink: null, introText: null };

  let imageUrl = null;
  let extractedLiveLink = null;
  let introText = null;

  // 1. Extract images (all markdown: ![alt](url) and HTML: <img src="url">)
  const mdImgMatches = [...rawMarkdown.matchAll(/!\[.*?\]\(([^\s)]+)\)/gi)];
  for (const match of mdImgMatches) {
    const candidate = match[1];
    if (candidate && !isBadgeUrl(candidate)) {
      if (candidate.startsWith('http')) {
        imageUrl = candidate;
        break;
      } else {
        // Relative path
        const cleanPath = candidate.replace(/^\.?\//, '');
        imageUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${cleanPath}`;
        break;
      }
    }
  }

  if (!imageUrl) {
    const htmlImgMatches = [...rawMarkdown.matchAll(/<img[^>]+src=["']([^"']+)["']/gi)];
    for (const match of htmlImgMatches) {
      const candidate = match[1];
      if (candidate && !isBadgeUrl(candidate)) {
        if (candidate.startsWith('http')) {
          imageUrl = candidate;
          break;
        } else {
          const cleanPath = candidate.replace(/^\.?\//, '');
          imageUrl = `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/${cleanPath}`;
          break;
        }
      }
    }
  }

  // 2. Extract live link if present in README (e.g. vercel.app, netlify.app, or labeled Live Demo)
  const vercelMatch = rawMarkdown.match(/https?:\/\/[a-zA-Z0-9-]+\.(?:vercel\.app|netlify\.app|onrender\.com)/i);
  if (vercelMatch && vercelMatch[0]) {
    extractedLiveLink = vercelMatch[0];
  }

  // 3. Extract first non-header paragraph for introText
  const lines = rawMarkdown.split('\n');
  const paragraphLines = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      if (paragraphLines.length > 0) break;
      continue;
    }
    // Skip headers (# ...), badges ([![...]]), images (![...]), html tags
    if (trimmed.startsWith('#') || trimmed.startsWith('[![') || trimmed.startsWith('![') || trimmed.startsWith('<')) {
      continue;
    }
    paragraphLines.push(trimmed);
  }

  if (paragraphLines.length > 0) {
    introText = paragraphLines
      .join(' ')
      .replace(/\*\*([^*]+)\*\*/g, '$1') // strip bold
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1'); // strip md links
  }

  return { imageUrl, extractedLiveLink, introText };
}

/**
 * Fetch raw README content from raw.githubusercontent.com without hitting API rate limits
 */
async function fetchRawReadme(repoName, defaultBranch = 'main') {
  try {
    const response = await fetch(
      `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/${defaultBranch}/README.md`
    );
    if (response.ok) {
      return await response.text();
    }
    // Try master fallback
    if (defaultBranch === 'main') {
      const masterRes = await fetch(
        `https://raw.githubusercontent.com/${GITHUB_USERNAME}/${repoName}/master/README.md`
      );
      if (masterRes.ok) return await masterRes.text();
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetch public repositories from GitHub with smart caching
 */
export async function fetchGitHubProjects(curatedProjects = []) {
  // 1. Try reading from localStorage cache
  if (typeof window !== 'undefined') {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { timestamp, data } = JSON.parse(cached);
        const age = Date.now() - timestamp;
        if (age < CACHE_TTL_MS && Array.isArray(data) && data.length > 0) {
          // Trigger silent background revalidation if older than 15 mins
          if (age > 15 * 60 * 1000) {
            refreshGitHubCacheInBackground(curatedProjects);
          }
          return data;
        }
      }
    } catch (e) {
      console.warn('GitHub cache read error:', e);
    }
  }

  // 2. Fetch fresh from GitHub
  try {
    const freshProjects = await fetchAndProcessRepos(curatedProjects);
    if (freshProjects && freshProjects.length > 0 && typeof window !== 'undefined') {
      try {
        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ timestamp: Date.now(), data: freshProjects })
        );
      } catch (e) {
        console.warn('Failed to cache GitHub projects:', e);
      }
    }
    return freshProjects;
  } catch (error) {
    console.error('Failed to fetch GitHub projects, using curated fallback:', error);
    return curatedProjects;
  }
}

/**
 * Silent background cache refresh
 */
async function refreshGitHubCacheInBackground(curatedProjects) {
  try {
    const freshProjects = await fetchAndProcessRepos(curatedProjects);
    if (freshProjects && freshProjects.length > 0 && typeof window !== 'undefined') {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ timestamp: Date.now(), data: freshProjects })
      );
    }
  } catch {
    // Fail silently in background
  }
}

/**
 * Fetch, parse, and merge GitHub repositories with curated projects
 */
async function fetchAndProcessRepos(curatedProjects = []) {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&per_page=40`
  );

  if (!response.ok) {
    throw new Error(`GitHub API returned status ${response.status}`);
  }

  const repos = await response.json();
  if (!Array.isArray(repos)) return curatedProjects;

  // Filter public repos, exclude forks and special system repos
  const validRepos = repos.filter(
    (repo) => !repo.fork && !repo.private && !EXCLUDED_REPOS.has(repo.name)
  );

  // Map curated projects by normalized key
  const curatedMap = new Map();
  curatedProjects.forEach((p) => {
    curatedMap.set(p.title.toLowerCase().replace(/[^a-z0-9]/g, ''), p);
    curatedMap.set(p.id.toLowerCase().replace(/[^a-z0-9]/g, ''), p);
    if (p.github) {
      const match = p.github.match(/github\.com\/[^/]+\/([^/]+)/i);
      if (match && match[1]) {
        curatedMap.set(match[1].toLowerCase().replace(/[^a-z0-9]/g, ''), p);
      }
    }
  });

  // Process top active repos
  const processedRepos = await Promise.all(
    validRepos.slice(0, 15).map(async (repo) => {
      const normalizedKey = repo.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      const existingCurated = curatedMap.get(normalizedKey);

      // Fetch README for banner image and deeper details
      const rawReadme = await fetchRawReadme(repo.name, repo.default_branch);
      const { imageUrl, extractedLiveLink, introText } = parseReadme(
        rawReadme,
        repo.name,
        repo.default_branch
      );

      // Official GitHub social preview card as reliable fallback poster
      const ogPoster = `https://opengraph.githubassets.com/1/${GITHUB_USERNAME}/${repo.name}`;
      const posterImage = existingCurated?.image || imageUrl || ogPoster;
      const liveDemo =
        (repo.homepage && repo.homepage.startsWith('http') ? repo.homepage : null) ||
        existingCurated?.demo ||
        extractedLiveLink ||
        null;

      const category = existingCurated?.category || inferCategory(repo);
      const tags =
        existingCurated?.tags ||
        (repo.topics && repo.topics.length > 0
          ? repo.topics.slice(0, 5)
          : [repo.language, category].filter(Boolean));

      // If already curated with a rich story, merge live stats and links
      if (existingCurated) {
        return {
          ...existingCurated,
          stars: repo.stargazers_count,
          pushedAt: repo.pushed_at,
          github: repo.html_url,
          demo: liveDemo || existingCurated.demo,
          image: existingCurated.image || posterImage,
        };
      }

      // New dynamically fetched project from GitHub
      return {
        id: repo.name.toLowerCase(),
        title: formatRepoTitle(repo.name),
        category,
        description:
          repo.description ||
          introText ||
          `Open source ${category.toLowerCase()} project built with ${repo.language || 'modern technologies'}.`,
        longDescription:
          introText ||
          repo.description ||
          `A ${category} software project developed by Rishiraj Debnath. Explore the source repository on GitHub for full architecture details.`,
        highlights: [
          `Public repository with ${repo.stargazers_count || 0} stars on GitHub`,
          `Written primarily in ${repo.language || 'TypeScript / JavaScript'}`,
          `Last updated on ${new Date(repo.pushed_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`,
        ],
        story: null, // Can be populated later or left for quick preview
        tags,
        github: repo.html_url,
        demo: liveDemo,
        image: posterImage,
        alt: `${formatRepoTitle(repo.name)} preview`,
        stars: repo.stargazers_count,
        pushedAt: repo.pushed_at,
        isAutoSynced: true,
      };
    })
  );

  // Retain any curated project that wasn't matched in the top repos (e.g. CampusSpace)
  const result = [...processedRepos];
  curatedProjects.forEach((curated) => {
    const isAlreadyIn = result.some(
      (r) =>
        r.id === curated.id ||
        r.title.toLowerCase() === curated.title.toLowerCase()
    );
    if (!isAlreadyIn) {
      result.unshift(curated); // put flagship story projects at top
    }
  });

  return result;
}
