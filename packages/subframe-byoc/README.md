# @subframe/byoc

Subframe's Bring Your Own Code package.

## Installation

```bash
npm install @subframe/byoc
```

## Usage

```typescript
import { helloWorld, type HelloWorldMessage, type HelloWorldOptions } from '@subframe/byoc';

// Basic usage
const response = helloWorld();
console.log(response.message); // "Hello from Subframe BYOC!"

// With timestamp
const options: HelloWorldOptions = { includeTimestamp: true };
const responseWithTime = helloWorld(options);
console.log(responseWithTime.message); // "Hello from Subframe BYOC!"
console.log(responseWithTime.timestamp); // Current date/time
``` 