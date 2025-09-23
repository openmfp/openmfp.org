# Luigi Context

The [Luigi context](https://docs.luigi-project.io/docs/navigation-advanced?section=contexts) contains information about the current context such as the user ID or api urls.

## Portal Context

The `portalContext` field in the context provides API URLs to often used services:

```json
 "portalContext": {
    "accountsServiceApiUrl": "https://api.example.com/accounts/query",
    "organizationServiceApiUrl": "https://api.example.com/org/query"
  },
```

## Entity Context

The `entityContext` field in the context provides information about the current entity. 
For example, when the user navigates to a `project` (or a sub entity such as `project.component`) 
information about the project is provided. Currently, information about a project and a component are provided. Structure:

```json
"entityContext": {
    "entity1": {...},
    "entity2": {...}
}
```

### Project

```json
"entityContext": {
   "project": {
      "id": "PROJECT_ID",
      "policies": ["POLICY_1","POLICY_2"] // policies for the current user in this project
    }
}
```


### Component

For the entity `component` information from the metadata service is provided, currently the following fields are available:

```json
"entityContext": {
    "component": {
      "id": "...",
      "type": {
        "name": "...",
        "lifecycle": "...",
        "categories": ["..."]
      },
      "labels": [
          {
              "name": "...",
              "value": "..."
          }
      ],
      "annotations": [
           {
              "name": "...",
              "value": "..."
          }
      ],
      "tags": [
        "...",
      ]
    }
}
```
