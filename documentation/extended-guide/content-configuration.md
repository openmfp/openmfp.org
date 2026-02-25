# Content Configuration

This document shows you how to create the configuration `content-configuration.json` file for your application.
It also describes the various parameters the file may contain.
In general this file contains any [Luigi Configuration](#luigi-standard-configuration-parameters) values but also and [Portal Specific Configuration](#portal-specific-configuration-parameters) values.

## The Content Configuration File and Portal Extensions

To create a micro frontend that is displayed in the portal, you need to create a `content-configuration.json` configuration file that contains [Luigi](https://luigi-project.io/) and Portal configuration.

This file is picked up by the deployed portal server at runtime therefore the file needs to be reachable from the domain the portal server is deployed on.
The registration to the portal happens through the portals Extension mechanism.
Technically an Extension is a Custom Resource Definition of Kubernetes.
It is a dedicated resource in the Kubernetes cluster and this resource contains the URL to the `content-configuration.json` file of your application.

## The Content Configuration File Contents

The `content-configuration.json` has the following structure:

```ts
const contentConfiguration = {
  name: 'example',
  luigiConfigFragment: {
    data: {
      viewGroup: {
        preloadSuffix: '',
        requiredIFramePermissions: {
          allow: [''],
          sandbox: [''],
        },
      },
      nodes: [
        {
          pathSegment: '',
          label: '',
          urlSuffix: '',
          entityType: '',
        },
      ],
      userSettings: {
        groups: {
          group_id: {
            label: '',
            viewUrl: '',
            title: '',
            settings: {},
          },
        },
      },
      targetAppConfig: {
        'example.integration': {
          urlTemplateParams: {},
        },
        'example.app': {
          crossNavigation: {
            inbounds: {
              'Samples-view': {
                semanticObject: '',
                action: '',
                pathSegment: '',
              },
            },
          },
        },
      },
      texts: [
        {
          locale: '',
          textDictionary: {
            text: '',
          },
        },
      ],
    },
  },
}
```

Here is another example with actual values:

```ts
const contentConfiguration: ContentConfiguration = {
    name: 'example',
    luigiConfigFragment: {
        data: {
            viewGroup: {
                preloadSuffix: '/#/preload',
                requiredIFramePermissions: {
                    allow: ['clipboard-read'],
                    sandbox: ['allow-forms'],
                },
            },
            nodeDefaults: {
                isolateView: false,
            },
            nodes: [
                {
                    label: '{{sample}}',
                    children: [
                        {
                            pathSegment: ':someId',
                            label: 'Child Sample',
                            hideFromNav: true,
                            virtualTree: true,
                            urlSuffix: '/#sample-child/:someId',
                            context: {
                                sampleInstanceId: ':someId',
                            },
                            navHeader: {
                                useTitleResolver: true,
                            },
                            titleResolver: {
                                request: {
                                    url: 'https://path.to/your/rest/${someId}',
                                    method: 'GET',
                                    headers: {},
                                    body: {},
                                },
                                titlePropertyChain: 'result.name',
                                iconPropertyChain: 'result.pictureUrl',
                                fallbackTitle: 'Sample Entity',
                                fallbackIcon: 'course-book',
                                prerenderFallback: false,
                            },
                            defineEntity: {
                                id: 'sampleEntity',
                                contextKey: 'sampleInstanceId',
                                dynamicFetchId: 'sample',
                            },
                        },
                    ],
                    pathSegment: 'sample',
                    entityType: 'project',
                    hideFromNav: false,
                    icon: 'manager',
                    isolateView: false,
                    virtualTree: true,
                    hideSideNav: false,
                    loadingIndicator: { enabled: true },
                    urlSuffix: '/sample',
                    category: {
                        label: 'Samples',
                        collapsible: false,
                    },
                    requiredIFramePermissions: {
                        allow: ['clipboard-read', 'clipboard-write'],
                        sandbox: ['allow-forms'],
                    },
                },
            ],
            userSettings: {
                groups: {
                    account: {
                        label: 'Account',
                        sublabel: 'Account',
                        icon: 'account',
                        title: 'Account Settings',
                        viewUrl: 'https://url.to.mf',
                        settings: {
                            name: { type: 'string', label: 'Name', isEditable: true },
                            checkbox: {
                                type: 'boolean',
                                label: 'Checkbox',
                                isEditable: false,
                                style: 'checkbox',
                            },
                            enum: {
                                type: 'enum',
                                style: 'button',
                                label: 'Label',
                                options: ['option1', 'option2', 'option3'],
                                description: 'Description',
                            },
                        },
                    },
                },
            },
            targetAppConfig: {
                'example.integration': {
                    urlTemplateParams: {},
                },
                'example.app': {
                    crossNavigation: {
                        inbounds: {
                            'Sample-view': {
                                semanticObject: 'Sample',
                                action: 'view',
                                pathSegment: '/projects/:projectId/samples',
                            },
                        },
                    },
                },
            },
            texts: [
                {
                    locale: '',
                    textDictionary: {
                        sample: 'Sample',
                    },
                },
                {
                    locale: 'en',
                    textDictionary: {
                        sample: 'Sample',
                    },
                },
                {
                    locale: 'de',
                    textDictionary: {
                        sample: 'Beispiel',
                    },
                },
            ],
        },
    },
};
```

### Luigi Standard Configuration Parameters

The `nodes` in the `content-configuration.json` are iterated and added to the frame navigation.
Each one can contain the following Luigi navigation parameters:

- [label](https://docs.luigi-project.io/docs/navigation-configuration/?section=label)
- [pathSegment](https://docs.luigi-project.io/docs/navigation-configuration/?section=pathsegment)
- [externalLink](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=externallink)
- [hideFromNav](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=hidefromnav)
- [icon](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=icon)
- [isolateView](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=isolateview)
- [virtualTree](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=virtualtree)
- [hideSideNav](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=hidesidenav)
- [loadingIndicator](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=loadingindicatorenabled)
- [category](https://docs.luigi-project.io/docs/navigation-configuration/?section=category)
- [visibleForFeatureToggles](https://docs.luigi-project.io/docs/navigation-parameters-reference?section=visibleforfeaturetoggles)

The `userSettings` config allows to open a user settings dialog.
-  `groups` contains different categories for user settings, e.g. Account, Theming, etc.
   For more information, read the [Luigi user settings documentation](https://docs.luigi-project.io/docs/user-settings).

### Portal Specific Configuration Parameters

Further Portal specific parameters are supported on node level:

- **url** = [viewUrl](https://docs.luigi-project.io/docs/navigation-configuration/?section=viewurl) - it is recommended to use the **urlSuffix** property, so that all links are relative to the micro frontend and no absolute URLs are required.

- **children** - contains child elements. The children nodes can have the following Luigi navigation parameters: **pathSegment**, **label**, **hideFromNav**, **icon**, **useHashRouting**, **virtualTree**, **urlSuffix** and **category**.
  To build the viewUrl of the child node the **urlSuffix** property of the parent is used: `urlTemplateParams.url`+`node.urlSuffix`+`child.urlSuffix`.

- **visibleForEntityContext** - allows to filter the nodes that are shown based on the [entity context](/documentation/extended-guide/luigi-context#entity-context). Currently, the backend provides an entity context for the entities `project` and `component`. A node is shown, if the entity context provides all values as required by the filter, for this the [_.isMatch](https://lodash.com/docs/4.17.15#isMatch) function is used. The format of the filter is the following:

```json
"visibleForEntityContext": {
   "entity1": {
      "id": "abc",
      ...
   },
   "entity2": {
      "id": "def",
      ...
   }
}
```

- **visibleForContext** - allows to filter the nodes that are shown based on the [context](/documentation/extended-guide/luigi-context). In this field, a [JMESPath](https://jmespath.org/specification.html) query can be defined. When it evaluates to `true`, the node will be shown.

- **configurationMissing** - allows to show a "configuration missing" page based on the [context](/documentation/extended-guide/luigi-context). In this field, a [JMESPath](https://jmespath.org/specification.html) query can be defined. When it evaluates to `true`, the "configuration missing" page will be shown, otherwise the normal page.

- **configurationHint** - Allows to customise the "configuration missing" page with an extension specific hint.

- **configurationLink** - Allows to customise the "configuration missing" page with an extension specific link.

- **urlSuffix** - if no URL property is defined, the **viewUrl** of the node is built as `urlTemplateParams.url`+`node.urlSuffix`. For most cases, it is recommended to skip the **urlTemplateParams.url** (see explanation below) to avoid absolute URLs in the `content-configuration.json`.

  > NOTE: The **url** property in the **urlTemplateParams** defines the base URL of the micro frontend. If it is omitted,
  the host URL of the micro frontend is taken. For example: When the `content-configuration.json` is loaded from ```https://my.microfrontend.com/assets/content-configuration.json```, the **url** property will be ```https://my.microfrontend.com/```. This allows you to omit the absolute URL in case your micro frontend will be served from different domains.

- **requiredIFramePermissions** (optional) - allows to define required [feature policies](https://developer.mozilla.org/en-US/docs/Web/API/HTMLIFrameElement/featurePolicy) and sandbox permissions, they will be applied to the Iframe's `allow` and `sandbox` attributes. For single page application micro frontends, it is recommended to use **viewGroup** (see below) to specify them.

- [viewGroup](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=viewgroup) - can have a **preloadSuffix** property which defines a **preloadUrl** that is added to the global **viewGroupSettings**. The URL is built as follows: `urlTemplateParams.url`+`viewGroup.urlSuffix`.

- **showBreadcrumbs** - if set to `false`, a breadcrumbs header is not shown for this node

- **targetAppConfig** - defines the Portal configurations.

- **texts** - defines the text dictionary for localization (i18n). The context with double curly braces (in the example above, this is the node label `"{{sample}}"`) defined in `content-configuration.json` will be replaced by the value of the dictionary.


### Entity Types

The following section explains Portal-specific parameters related to entity types:

- **entityType** - defines the location within the Portal navigation tree under which this node will be added. Currently, there is an **entityType** predefined in Portal:  "global". The **entityType** correlates with a particular route in Portal, so it defines the base route to which your micro frontends pathSegment is added.
    - Example ("global"): If the [pathSegment](https://docs.luigi-project.io/docs/navigation-configuration/?section=pathsegment) of the child node is `overview` and **entityType** is `global`, the node is shown in Portal's global navigation and the resulting route will be `/overview`.
    - Example ("project"): A project has a dynamic URL part. If the child **pathSegment** is "overview" and the **entityType** is "project", the URL will be `/project/123ProjectId/overview`.
  > NOTE: The **projectId** is available in the Luigi context object and can be retrieved by the micro frontend using the [initListener](https://docs.luigi-project.io/docs/luigi-client-api/?section=addinitlistener) / [contextUpdateListener](https://docs.luigi-project.io/docs/luigi-client-api/?section=addcontextupdatelistener).
  For example: `LuigiClient.addInitListener((context) => console.log(context.projectId))`.

- **defineEntity** - defines a new **entityType** (see above section). Next to the mandatory **id**, two additional properties can be specified to dynamically fetch additional micro frontends from the extension manager for a particular entity instance: **dynamicFetchId** specifies the ScopeType and **contextKey** defines the property key in the luigi context that holds the instance id.
    - Static example:

      ```json
        "nodes": [{
            "label": "{{sample}}",
            "pathSegment": "sample",
            "entityType": "project",
            "urlSuffix": "/sample"
  
            "defineEntity": {
              "id": "custom"
            }
        }]
      ```
      In this configuration, a node is specified, which will be added under the **project** entity and itself defines a new entity named **custom**. Other micro frontends can add themselves under this node by specifying entityType **project.custom**.
      > NOTE: Nested entity type definitions can be referenced by concatenating all entity types (except the "special" entity type **global**) separated by a dot.

    - Dynamic example:

      ```json
        "nodes": [{
            "label": "{{sample}}",
            "pathSegment": "sample",
            "entityType": "project",
            "urlSuffix": "/sample",
            "children": [{
                "pathSegment": ":someId",
                "label": "Child Sample",
                "urlSuffix": "/#sample-child/:someId",
                "context": {
                  "sampleInstanceId": ":someId"
                },
                "defineEntity": {
                  "id": "sampleEntity",
                  "contextKey": "sampleInstanceId",
                  "dynamicFetchId": "sample"
                }
            }]
        }]
      ```
      Unlike the static example, here **dynamicFetchId** and **contextKey** are defined, so additional nodes will be fetched from the extension manager for this entity type.

      For example, a route `/projects/123ProjectId/sample/123someId` will result in a request with the following data:

        - Entity Type: `sample` - dynamicFetchId
        - Entity Id: `123sampleId` - this value is retrieved from the node **context** object, specified by the `contextKey` property.
        - Entity context information: `{ project: '123ProjectId' }` - Extension Type/Id pairs for all dynamic parent entities.

      The extension manager will map these data to its according SCOPES and filters and return the relevant extension instances.
      The retrieved nodes will then be added as children to the entity navigation node.

    - Entity error handling

      In order to use the built-in entity error handling (which requires a dedicated `EntityContextProvider`), you can additionally specify the following properties under `defineEntity`:
        - `label`: The (localized) entity label
        - `pluralLabel`: The (localized) entity plural label
        - `notFoundConfig`: an object with the following properties:
            - `entityListNavigationContext`: a string containing the luigi navigation context that has been specified for the entity list node
            - `sapIllusSVG`: Fiori Moments illustration to be shown on error page, one of (https://github.com/openmfp/portal-ui-lib/tree/main/src/assets/moments), without ``sapIllus-` prefix and file ending (e.g. **Dialog-BeforeSearch-Alt**)

- **defineSlot** - a node defining an entity can provide a certain structure for it's direct child nodes by defining slot nodes, which have the **defineSlot** property set. If its value is an empty string, it means it is the default slot. Additionally, a category can be defined for a slot node, so all extension nodes assigned to that slot are part of that category.

    - Example:

      ```json
        "nodes": [{
            "label": "{{sample}}",
            "pathSegment": "sample",
            "entityType": "project",
            "urlSuffix": "/sample",
            "defineEntity": {
              "id": "sampleEntity"
            },
            "children": [{
                "defineSlot": "firstSlot"
              },{
                "defineSlot": ""
              },{
                "defineSlot": "settings",
                "category": {
                  "label": "{{settings}}",
                  "id": "settings"
                }
            }]
        }]
      ```

- **navSlot** - the id of the slot to which a navigation node should be added.

- **order** - a number that is used for ordering the node within the entity child list or a particular slot, if defined. This property can also be applied to a category.

  > NOTE: Nodes without a category are always sorted on top.

### Title Resolver and Navigation Header

A title resolver configuration allows to fetch micro frontend specific data outside the micro frontend application. This data can then be used to show a dynamic navigation header.

- **titleResolver** - basically a [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) configuration including a simple result processing to extract display title and image URL data. The configuration object has the following properties:
    - **request** - the request configuration consists of a **url** property to fetch the data from, as well as optional **method**, **headers** and **body** properties (see corresponding parameters [here](https://developer.mozilla.org/en-US/docs/Web/API/fetch#parameters)).

    - **titlePropertyChain** - dot-separated property chain to the title string inside the result object
    - **iconPropertyChain**- dot-separated property chain to the icon string inside the result object
    - **fallbackTitle** - a string that is used as the title in case of a fetch error
    - **fallbackIcon** - a string that is used as the icon in case of a fetch error
    - **prerenderFallback** - if set to true, the fallback icon and title are displayed while fetching the live values.

  One can reference data in the current node context by using the syntax `contextPropertyKey`, which will be replaced by it's value, e.g. to fetch values for a dynamic node or pass a token to the authorization header.


- **navHeader** - if defined at a node, a navigation header section is shown above the left-side navigation entries. There are two options how to define it:
    - statically by setting **icon**, **label** and optionally **type** properties, where icon can be an url to an image or an identifier of an icon.
    - dynamically by setting the **use** property to **titleResolver**.

### Feature Toggles

Feature toggles are a way to mark new or experimental features, so they are hidden before they are ready for release.


> **NOTE:** New features should always be hidden behind feature toggles until they are reviewed and stable.

Luigi offers feature toggle functionality which can be added to your `content-configuration.json` file.
To learn how to use feature toggles, see the "Use Feature Toggles in Luigi" section in this [document](https://docs.luigi-project.io/docs/advanced-scenarios/?section=expert-scenarios). After setting a feature toggle, you can restrict visibility of certain nodes/links on the left side navigation using the [visibleForFeatureToggles](https://docs.luigi-project.io/docs/navigation-parameters-reference/?section=visibleforfeaturetoggles) parameter, for example:

```json
"nodes": [{
    "pathSegment" : "home",
    "label" : "{{home}}",
    "hideSideNav": true,
    "icon": "home",
    "entityType": "global",
    "visibleForFeatureToggles":["home"],
    "defineEntity" : {
      "id" : "home"
    }]
```

Once you set a feature toggle in the configuration, the respective feature is not visible by default.
To make it visible one has to use `?ft=<feature-toggle>` URL query parameter.
For the example above, the query parameter would be `?ft=home`.
You can enable multiple feature toggles by providing a comma-separated list of feature toggles for example `?ft=home,project,v1`.

To retrieve from within your micro frontend application, use the Luigi Client to [get a list of active feature toggles](https://docs.luigi-project.io/docs/luigi-client-api?section=getactivefeaturetoggles):

```javascript
if (LuigiClient.getActiveFeatureToggles().includes('FeatureToggle1')) {
    //display content
  }
```

## Additional Luigi Features

If you need modals or alerts in your micro frontend, you must use the [Luigi Client APIs](https://docs.luigi-project.io/docs/luigi-client-api) to implement them in order to maintain a consistent user interface across Portal. Instead of being confined to the micro frontend area, these messages will be displayed as if they are a part of the bigger main application.

### Confirmation Modal

Luigi provides a modal element which can be used if you want to get a confirmation from the user before executing a certain operation. You must use Luigi's [showConfirmationModal](https://docs.luigi-project.io/docs/luigi-client-api/?section=showconfirmationmodal) function to add a modal to your micro frontend.

Example:
```javascript
import LuigiClient from '@luigi-project/client';
const settings = {
 type: "confirmation",
 header: "Confirmation",
 body: "Are you sure you want to do this?",
 buttonConfirm: "Yes",
 buttonDismiss: "No"
}
LuigiClient
 .uxManager()
 .showConfirmationModal(settings)
 .then(() => {
    // Logic to execute when the confirmation modal is confirmed
 });
```

### Alert

Luigi allows you to configure an alert which can inform the user of an error or provide some other information. To add an alert to your micro frontend, use Luigi's [showAlert](https://docs.luigi-project.io/docs/luigi-client-api/?section=showalert) function.

Example:
```javascript
import LuigiClient from '@luigi-project/client';
const settings = {
 text: "Ut enim ad minim veniam, {goToHome} quis nostrud exercitation ullamco {relativePath}. Duis aute irure dolor {goToOtherProject}",
 type: 'info',
 links: {
   goToHome: { text: 'homepage', url: '/overview' },
   goToOtherProject: { text: 'other project', url: '/projects/pr2' },
   relativePath: { text: 'relative hide side nav', url: 'hideSideNav' }
 },
 closeAfter: 3000
}
LuigiClient
 .uxManager()
 .showAlert(settings)
 .then(() => {
    // Logic to execute when the alert is dismissed
 });
```

### Localization (i18n)
The functions [getCurrentLocale](https://docs.luigi-project.io/docs/luigi-client-api/?section=getcurrentlocale) and [setCurrentLocale](https://docs.luigi-project.io/docs/luigi-client-api/?section=setcurrentlocale) for your micro frontend. It also offers the Portal-specific [**texts** parameter](#portal-specific-parameters
Luigi of) used in the `content-configuration.json` [example](#configuration-file) above. This allows you to translate the side navigation / settings dialog entries.

If you are using [localization](https://docs.luigi-project.io/docs/i18n) and translating your page into different languages, you can also add a `i18n.currentLocale` parameter to the viewUrl part of your configuration:

```javascript
{
  pathSegment: 'home',
  label: 'Home',
  viewUrl: 'https://example.com/{i18n.currentLocale}/microfrontend.html',
}
  ...
```

The `i18n.currentLocale` parameter will be replaced by the value of `LuigiI18N.getCurrentLocale()`, for example `https://example.com/en/microfrontend.html`

The i18n implementation itself should be developed using Angular i18n support. To find more information, see the [Angular documentation](https://angular.io/guide/i18n).

### Intent-based Navigation

Luigi allows you to navigate through micro frontends by using an intent-based navigation model which is inspired by the [SAP Fiori Launchpad intent-based navigation](https://help.sap.com/viewer/c0fe6b2660754f609482d4bfc5c619b1/1.18/en-US/745586a3468640d48b84ffe0e28fe473.html). This type of navigation removes the need to specify absolute paths to navigate between micro frontends. Rather than directly encoding the full absolute path to navigate to, app developers provide a semantic representation of the path.

This semantic representation is then mapped to the actual path in the Luigi configuration intent mappings. In this way, you do not need to change the absolute path links in all of your micro frontends each time you change your project structure, therefore making handling of navigation links much more resilient to change.

Example:

First, specify proper mappings in the `content-configuration.json` file of the target micro frontend under the field
`targetAppConfig['example.app'].crossNavigation.inbounds` as follows:

```javascript
 "targetAppConfig": {
   "example.app": {
      "crossNavigation": {
            "inbounds" : {
                "someView1": {
                        "semanticObject": "Templates",
                        "action": "view",
                },
                "someView2": {
                        "semanticObject": "Settings",
                        "action": "view",
                }
            }
        } 
    }
  }
```
The `inbounds` field defines the whole set of semantic representations that can be used in this `content-configuration` file.
`someView1` and `someView2` represent IDs we use to distinguish different targets.

Next, define the node in the tree of the `content-configuration.json` file where you want to use intent-based navigation.
In particular, in a use case where we use both `someView1` and `someView2`, the node representation would be as follows:

```javascript
 "nodes": [
    {
        "pathSegment": "templates",
        "label": "Templates",
        "entityType" : "project",
        "urlSuffix": "/#/templates",
        // define target here
        "target": {
          "type": "IBN",
          "inboundId": "someView1"
       }
    },
    {
        "pathSegment": "settings",
        "label": "Settings",
        "entityType" : "project",
        "urlSuffix": "/#/settings",
        // define target here
        "target": {
          "type": "IBN",
          "inboundId": "someView2"
       }
    }
]
```

(Notice that the `entityType` of the node refers to the parent entity (i.e.: 'project'), from which we build the global path dynamically.)

The resulting `content-configuration.json` would look as follows:

```ts 
const contentConfiguration: ContentConfiguration = {
    name: 'example',
    luigiConfigFragment: {
        data: {
            viewGroup: {
                preloadSuffix: '/#/preload',
            },
            nodeDefaults: {},
            nodes: [
                {
                    pathSegment: 'templates',
                    label: 'Templates',
                    entityType: 'project',
                    urlSuffix: '/#/templates',
                    // define target here
                    target: {
                        type: 'IBN',
                        inboundId: 'someView1',
                    },
                },
                {
                    pathSegment: 'settings',
                    label: 'Settings',
                    entityType: 'project',
                    urlSuffix: '/#/settings',
                    // define target here
                    target: {
                        type: 'IBN',
                        inboundId: 'someView2',
                    },
                },
            ],
            targetAppConfig: {
                _version: '1.13.0',
                'example.integration': {
                    navMode: 'inplace',
                    urlTemplateId: 'urltemplate.url',
                    urlTemplateParams: {
                        query: {},
                    },
                },
                'example.app': {
                    crossNavigation: {
                        inbounds: {
                            // define semantic representations (inbounds) here
                            someView1: {
                                semanticObject: 'Templates',
                                action: 'view',
                            },
                            someView2: {
                                semanticObject: 'Settings',
                                action: 'view',
                            },
                        },
                    },
                },
            },
        },
    },
};
```

(Notice how `someView1` and `someView2` are used only as IDs on node level, and are only defined in the `crossNavigation` section of the configuration.)

Links are then built using a semantic object and action which joined together represent a high level abstraction of the specific path. The path would be built as a concatenation of the global path of the parent entity joined with the node's own `pathSegment`.

Example:
Using the scenario above, we specified `project` as reference entity.
In case `project` is defined as follows, anywhere in the rest of the content-configuration's:
```javascript
// rest of configuration is hidden for readability
...
   "nodes": [
              {
                  "pathSegment": "projects",
                  "label": "Projects",
                  "children": [
                    {
                      "pathSegment": ":projectId",
                      "defineEntity": {
                        "id": "project"
                      }
                    }
                  ]
              }
   ]
...
```
... then the resulting paths built with the intents we defined would be:

```javascript

`/projects/:projectId/templates`
`/projects/:projectId/settings`
```

Lastly, in order to navigate to either of these micro frontends using intents, all that is needed is to use the Luigi built-in functionality:

```javascript
import LuigiClient from '@luigi-project/client';

// alternative 1 -> the call internally resolves to a navigation to `/projects/:projectId/templates`
LuigiClient.linkManager().navigateToIntent('Templates-view', {projectId: 'pr2'});
// alternative 2 -> the call internally resolves to a navigation to `/projects/:projectId/templates`
LuigiClient.linkManager().navigate('#?intent=Templates-view?projectId=pr2');
```

To navigate to the settings micro frontend, you could use:
```javascript
// alternative 1 -> the call internally resolves to a navigation to `/projects/:projectId/settings`
LuigiClient.linkManager().navigateToIntent('Settings-view', {projectId: 'pr2'});
// alternative 2 -> the call internally resolves to a navigation to `/projects/:projectId/settings`
LuigiClient.linkManager().navigate('#?intent=Settings-view?projectId=pr2');


//alternative 1 and 2 can be used interchangeably. 
```
