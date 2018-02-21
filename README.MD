# clark-tooltip

Basic tooltip directive to be used in CLARK system.

## Installation

To install this library, run:

```bash
$ npm install clark-tooltip --save
```

## Using

From your Angular `AppModule`:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Import module
import { TooltipModule } from 'clark-tooltip';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // Specify as an import
    TooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

These are all the directive options below:
```xml
<!-- You can now use in any component like so -->
<h1>
  Welcome to <span tip="This is the name of my site" tipLocation="above">{{strangeTitle}}</span>!
</h1>

<p>Confusing sentence with <span tip="This is the name of my site" tipLocation="above">words</span></p>

<button tip="Click me!" tipLocation="side">Mysterious Button</button>

```
Make sure to place within an inline element of some sort. <span>s are your friend.

## Development

To generate all `*.js`, `*.d.ts` and `*.metadata.json` files:

```bash
$ npm run build
```

## License

MIT © Tyler Howard
