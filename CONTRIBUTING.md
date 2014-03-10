# http-framework is an OPEN Open Source Project

-----------------------------------------

## What?

Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

## The structure of http-framework

`http-framework` consists of three pieces
 
### modules

All small modules that can be used for building web services can
  be added to the wiki page for modules.

If a module is used in an example it should be added to the 
  modules directory and the `package.json`

### examples

The main value of `http-framework` comes from a rich set of 
  examples. 

Every example should use modules where they are useful and 
  write production level code so that the quality is high
  even if they are copy pasted into production level apps

The examples should use a subset of the modules from the wiki,
  namely they should only use one module for one thing and not
  use two competing modules in two different examples.

To write an example feel free to copy / rewrite examples from
  other frameworks like `connect` and `hapi`

### Documentation

The second set of value of `http-framework` comes in the form of
  documentation. 

This documents how to use the modules and how to solve the 
  problem of the module from scratch.

For each module used in the examples we should have a single 
  markdown document, documenting that module.

The format for documentation is to state what problem the module
  solves and then implement a small server that uses the module
  and only the module to do that.

Next write a 'Do it by hand' example that uses zero modules and
  only uses node core to demonstrate how you would solve this
  from scratch so that users can see what benefit the module
  brings.

## Rules

There are a few basic ground-rules for contributors:

1. **No `--force` pushes** or modifying the Git history in any way.
1. **Non-master branches** ought to be used for ongoing work.
1. **External API changes and significant modifications** ought to be subject to an **internal pull-request** to solicit feedback from other contributors.
1. Internal pull-requests to solicit feedback are *encouraged* for any other non-trivial contribution but left to the discretion of the contributor.
1. Contributors should attempt to adhere to the prevailing code-style.

## Releases

Declaring formal releases remains the prerogative of the project maintainer.

## Changes to this arrangement

This is an experiment and feedback is welcome! This document may also be subject to pull-requests or changes by contributors where you believe you have something valuable to add or change.

-----------------------------------------
