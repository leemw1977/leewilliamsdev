---
title: Show Yourself On GatsbyJS And Amplify 
date: "2022-04-06T09:08:00.169Z"
description: My profile pic wasn't showing on my gatsbyjs blog starter hosted on amplify here's how I fixed it.
---

## Why are you working locally!
I mean here I am with a staging and production site set up for my blog and the darned profile pic is refusing to show, in development ... it worked (aka "It works on my machine").

## Amplify THIS!
Essentially in the rewrite and redirects section of my amplify app I needed to add `avif` and `webp` to the file redirect, it was essentially unable to locate those image files and causing a 404 which then meant it showed a wee grey circle on the profile pic. All sorted now!