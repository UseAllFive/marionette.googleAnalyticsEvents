# marionette.

# googleAnalyticsEvents

Brought to you by [Use All Five, Inc.](http://www.useallfive.com)

```
Author: Justin Anastos <janastos@useallfive.com>
Author URI: [http://www.useallfive.com](http://www.useallfive.com)
Repository: https://github.com/UseAllFive/marionette.googleAnalyticsEvents
```

## Scope

Trigger Google Analytics event and route calls from Marionette views/routes.

## Functionality

### Routes

Routes will automatically call a route navigate event like so:

```javascript
ga('send', 'event', 'route', 'navigate', '/some/deep/link');
```

No configuration is necessary for the routing events to be sent.

### Events

Marionette views can have an extra parameter added to each `trigger` object to
make it automatically track with Google Analytics.

For example:

```javascript
var view = Marionette.ItemView.extend({
    ui: {
        someButton: '.someButton'
    },
    triggers: {
        'click @ui.someButton': {
            event: 'eventToPropogate',
            googleAnalyticsConfig: {
                category: 'some category',
                event: 'some event',
                label: 'optional. some label'
            }
        }
    }
});
```

When the UI element is triggered, then the following will be called:

```javascript
`ga('send', 'event', 'some category', 'some event', 'optional. some label');
```

The `googleAnalyticsConfig` triggers option can also be a function that returns
an object like this:

```javascript
var view = Marionette.ItemView.extend({
    ui: {
        someButton: '.someButton'
    },
    triggers: {
        'click @ui.someButton': {
            event: 'eventToPropogate',
            googleAnalyticsConfig: function() {
                return {
                    category: this.model.get('something'),
                    event: 'some event',
                    label: 'optional. some label'
                };
            }
        }
    }
});
```
