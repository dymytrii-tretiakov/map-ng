
# Angular Map and List Application

## Overview

This project is an Angular-based application that integrates a map and a list of points. Users can filter points through a search input, select a point from the list to zoom the map to the selected location, and interact with the map to view and clear selected points.

## Features

- **Map Integration**: Displays points on a map using OpenLayers.
- **Search and Filter**: Users can filter the list of points using a search input.
- **Point Selection**: Clicking on a list item zooms the map to the corresponding point.
- **Map Interaction**: Moving or zooming the map clears the selected point.

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the application**:
   ```bash
   npm start
   ```

4. **Run tests**:
   ```bash
   npm run test
   ```

## Project Structure

- **app.component.ts**: The root component that integrates the map and list components.
- **map.component.ts**: Displays the map and handles map-related interactions.
- **list.component.ts**: Displays a list of points and allows filtering and selection.
- **points.service.ts**: Fetches points data from an external API.
- **point.interface.ts**: Defines the `Point` interface used across components.

## Usage

1. **Search and Filter**:
   - Use the search input to filter points by name. The list and map will update accordingly.

2. **Select a Point**:
   - Click on any list item to zoom the map to that point.

3. **Map Interaction**:
   - Move or zoom the map, and the selected point will be cleared.

## Testing

This project uses Jasmine and Karma for unit testing. To run the tests, use the following command:

```bash
npm run test
```

The tests cover:
- Component creation and initialization
- Event handling and interactions between components
- Service methods and HTTP requests

## Dependencies

- **Angular**: Frontend framework.
- **OpenLayers**: Library for map visualization.
- **RxJS**: Reactive extensions for asynchronous programming with observables.
- **Karma**: Test runner.
- **Jasmine**: Testing framework.
