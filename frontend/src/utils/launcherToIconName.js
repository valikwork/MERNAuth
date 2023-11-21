const launcherToIconName = (gameLauncher = '') => {
  switch (gameLauncher) {
    case 'EA':
      return 'ea';
    case 'Epic Games':
      return 'epicgames';
    case 'Steam':
      return 'steam';
    case 'battle.net':
      return 'battlenet';
    case 'Wargaming':
      return 'wargaming';
    default:
      return '';
  }
}

export default launcherToIconName