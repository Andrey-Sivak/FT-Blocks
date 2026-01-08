# FT Blocks

Custom Gutenberg blocks for the fotografkadomca website.

## Description

FT Blocks is a WordPress plugin that provides custom Gutenberg blocks designed specifically for the fotografkadomca photography website. Built with modern development practices and tools, it offers a seamless editing experience while maintaining high code quality standards.

## Features

- **Hero Block**: Custom hero section block for impactful page headers
- **Bilingual Support**: Full internationalization support for English and Czech languages
- **Modern Development**: Built with React, JSX, and WordPress block editor APIs
- **Code Quality**: Integrated linting and formatting tools (ESLint, Prettier, PHPCS)

## Requirements

- **WordPress**: 6.0 or higher
- **PHP**: 7.4 or higher
- **Node.js**: 16.0 or higher (for development)
- **Composer**: 2.0 or higher (for development)

## Installation

### For Users

1. Download the plugin ZIP file
2. Navigate to WordPress Admin → Plugins → Add New
3. Click "Upload Plugin" and select the ZIP file
4. Click "Install Now" and then "Activate"

### For Developers

1. Clone the repository into your WordPress plugins directory:
   ```bash
   cd wp-content/plugins/
   git clone [repository-url] ft-blocks
   cd ft-blocks
   ```

2. Install dependencies:
   ```bash
   npm install
   composer install
   ```

3. Build the plugin:
   ```bash
   npm run build
   ```

4. Activate the plugin in WordPress Admin

## Development

### Build Commands

- `npm run start` - Start development mode with hot reload
- `npm run build` - Build production-ready assets
- `npm run format` - Format code with Prettier
- `npm run lint:js` - Lint JavaScript files
- `npm run lint:css` - Lint CSS/SCSS files
- `npm run plugin-zip` - Create distribution ZIP file

### PHP Commands

- `composer lint:php` - Run PHPCS linting

### Project Structure

```
ft-blocks/
├── build/              # Compiled assets (generated)
├── languages/          # Translation files
├── src/                # Source files
│   ├── blocks/        # Block components
│   │   └── hero/      # Hero block
│   └── index.js       # Main entry point
├── tests/             # PHPUnit tests
├── ft-blocks.php      # Main plugin file
├── package.json       # Node dependencies
├── composer.json      # PHP dependencies
└── phpcs.xml.dist     # PHP CodeSniffer configuration
```

### Coding Standards

This plugin follows:
- [WordPress Coding Standards](https://developer.wordpress.org/coding-standards/)
- [WordPress JavaScript Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/javascript/)
- [WordPress PHP Coding Standards](https://developer.wordpress.org/coding-standards/wordpress-coding-standards/php/)

### Creating New Blocks

1. Create a new directory in `src/blocks/[block-name]/`
2. Add required files:
   - `block.json` - Block metadata
   - `index.js` - Block registration
   - `edit.js` - Editor component
   - `render.php` - Server-side rendering (if needed)
3. Import the block in `src/index.js`
4. Add block name to the array in `ft-blocks.php`
5. Run `npm run build`

## Internationalization

The plugin supports multiple languages. Translation files are located in the `languages/` directory.

### Supported Languages
- English (en_US) - Default
- Czech (cs_CZ)

### Contributing Translations

1. Use the `languages/ft-blocks.pot` template file
2. Create translations using [Poedit](https://poedit.net/) or similar tools
3. Save `.po` and `.mo` files in the `languages/` directory

## Testing

Run PHPUnit tests:
```bash
composer test
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code passes all linting checks
- New features include appropriate tests
- Documentation is updated accordingly

## Security

If you discover a security vulnerability, please review our [Security Policy](SECURITY.md) for responsible disclosure guidelines.

## License

This plugin is licensed under the GPL-2.0-or-later license. See the [LICENSE](LICENSE) file for details.

## Author

**Andrii Sivak**
- GitHub: [@Andrey-Sivak](https://github.com/Andrey-Sivak)

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for version history and release notes.

## Support

For bug reports and feature requests, please use the [GitHub Issues](https://github.com/Andrey-Sivak/ft-blocks/issues) page.
