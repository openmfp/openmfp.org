---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "OpenMFP"
  text: "Open Micro Frontend Platform"
  tagline: "OpenMFP enables the dynamic integration of services into a unified common interface experience via Micro Frontends"
  image:
    src: '/logo.png'
    alt: 'OpenMFP'
  actions:
    - theme: brand
      text: Get Started
      link: /documentation/
    - theme: alt
      text: GitHub
      link: https://github.com/openmfp

features:
  - title: Micro Frontend Platform
    details: A flexible Micro Frontend platform built on top of the <a href="https://luigi-project.io/" target="_blank">Luigi Micro Frontend Framework</a>, enabling the composition of technology-agnostic Micro Frontends into dynamic portals at runtime.
    link: /documentation/concepts#extensibility-micro-frontend-architecture
  - title: Easy to Extend
    details: Seamless Micro Frontend integration through content configuration only, no coding required. Simply provide a content configuration file and register your Micro Frontend in your OpenMFP based portal.
    link: /documentation/extended-guide/content-configuration
  - title: Reusable Libraries
    details: Reuse existing libraries and frameworks to build your Micro Frontends, reducing duplication and speeding up development. OpenMFP does not impose any restrictions on the technology you use.
    link: /documentation/getting-started/create-microfrontend
  - title: Developer Experience
    details: An intuitive, developer-friendly environment designed to make building Micro Frontends faster, smoother, and more enjoyable.
    link: /documentation/getting-started/local-develpment
    

---

