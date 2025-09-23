# Introduction

The Open Micro Frontend Platform (OpenMFP) key value propositions are the dynamic extension model and the inclusion of central shared services (e.g. for Authorization), which enable the seamless integration of UI capabilities from different teams and disparate organizations. Whereas classical UI integration techniques typically force teams to fully align their release and life cycle procedures, OpenMFP preserves the autonomy for teams to contribute independent capabilities and services, while not impeding the teams in their choice of technology and allowing them to independently release and life cycle their services.

:::info
OpenMFP is an early preview version, designed to provide a demo environment and showcase the OpenMFP Portal for exploring the platform and offering valuable feedback. Please note that it is not yet complete and is still under active development. Your feedback is essential in helping us refine and improve the platform.
:::

## Why do we Need a Micro Frontend Platform?

Modern cloud environments are inherently complex, consisting of many services, each potentially with its own user interface and technology stack. This diversity introduces several challenges:

- **Redundant Implementations**: Common functions, such us authentication and authorization, are often developed independently by different teams, leading to duplication and increased complexity.
  
- **Integration Difficulties**: Services developed in isolation are challenging to integrate seamlessly, resulting in delays and higher maintenance costs.

- **Fragmented User Experience**: Users often need to navigate multiple interfaces, hampering productivity and decreasing satisfaction.

OpenMFP addresses these challenges by providing a unified interface that consolidates services, making it easier for both users and administrators to manage resources efficiently and securely.


## Key Features

- Authentication service.
- A frontend OpenMFP Portal that integrates multiple services and their UIs.
- An extensible control plane with API resources (planned).
- An authorization service with an extensible permission model (planned).

