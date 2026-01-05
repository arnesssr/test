# Contributing to ModernStore

Thank you for your interest in contributing to ModernStore! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone <your-fork-url>`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install --legacy-peer-deps`
5. Start development server: `npm run dev`

## Development Workflow

### Code Style

- We use TypeScript for type safety
- Follow the existing code structure and naming conventions
- Use functional components with hooks
- Keep components small and focused
- Write meaningful commit messages

### TypeScript Guidelines

- Define proper types for all props and state
- Avoid using `any` type
- Use interfaces for object types
- Export types that might be reused

### Component Guidelines

- Place components in appropriate directories
- Create a separate file for each component
- Include proper TypeScript types
- Use Tailwind CSS for styling
- Add proper ARIA labels for accessibility

### State Management

- Use Zustand for global state
- Use React Query for server state
- Keep local state when appropriate
- Persist only necessary data

### Testing

Before submitting a PR:

1. Run `npm run lint` to check for TypeScript errors
2. Ensure your code builds: `npm run build`
3. Test in both light and dark modes
4. Check responsive design on different screen sizes
5. Test keyboard navigation and accessibility

## Submitting Changes

1. Commit your changes with clear messages
2. Push to your fork
3. Create a Pull Request
4. Describe your changes and their purpose
5. Link any related issues

## Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Update documentation if needed
- Ensure all checks pass
- Respond to review feedback promptly

## Code Review Process

1. PRs require at least one approval
2. All CI checks must pass
3. Code must follow project conventions
4. Documentation must be updated

## Feature Requests

- Open an issue with the "feature request" label
- Describe the feature and its benefits
- Discuss implementation approach

## Bug Reports

When reporting bugs, include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Browser and OS information

## Questions?

Feel free to open a discussion or issue for any questions.

Thank you for contributing! 🎉
