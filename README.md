# Zoom Module for Drupal

## Introduction

The Zoom module enhances Drupal websites by enabling zoom functionality on image fields. Users can hover over images to see a zoomed-in view, improving user engagement and content accessibility.

## Features

- Easy integration with Drupal image fields.
- Configurable zoom options to tailor the experience to your site's needs.
- Smooth and responsive zoom effect on hover.

## Installation

1. Clone the Zoom module repository into your Drupal modules directory:
    ```bash
    git clone git@github.com:uaz-web/az_zoom.git
    ```
2. Enable the module via Drupal's Extend menu or using Drush:
    ```bash
    drush en az_zoom -y
    ```
3. Configure image fields to use the Zoom formatter in the Manage Display settings of your content types.

## Usage

To apply the zoom effect, navigate to the Manage Display settings of a content type with an image field. Change the field formatter to "Image Zoom" and configure the formatter settings as desired.

### Compatibility

This module is only compatible with image fields.

## Local Development with Lando

### Prerequisites

- **Lando**: Install Lando from [Lando's Installation Guide](https://docs.lando.dev/basics/installation.html).
- **Git**: Ensure Git is installed on your machine.

### Setup

The provided Lando configuration facilitates easy setup of a local development environment for the Zoom module. Follow these steps:

1. Clone the Zoom module repository:
    ```bash
    git clone git@github.com:uaz-web/az_zoom.git
    ```
2. Navigate to the module directory:
    ```bash
    cd az_zoom
    ```
3. Start Lando to initialize your local development environment:
    ```bash
    lando start
    ```
4. Install Drupal along with the Zoom module:
    ```bash
    lando install
    ```

### Local Development Tools

The Lando configuration includes several development tools:

- **Drush**: Drupal's command-line interface.
- **Drupal Console**: Another command-line interface for Drupal.
- **PHP CodeSniffer (phpcs/phpcbf)**: Tools to check and fix coding standards.
- **PHPStan**: PHP static analysis tool.
- **ESLint**: JavaScript linter for code quality and coding style.
- **Yarn**: Package manager for managing Node.js dependencies.

Refer to the `.lando.yml` file for custom tooling commands and additional services included in your local development environment.

## Contributing

Contributions to the Zoom module are welcome. Please use GitHub issues and pull requests to contribute code or suggest improvements.
