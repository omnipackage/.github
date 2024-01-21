---
layout: default
title: About
permalink: /about
---

#### Distributing software for GNU/Linux is [hard](https://www.youtube.com/watch?v=Pzl1B7nB9Kc){:target="_blank"}

You cannot build a binary and expect it to work across *all* Linux distributions due to incompatible ABI of shared libraries. Unlike Windows and macOS you cannot rely on the fact that every user's OS will have certain libraries with certain level of backward and forward compatibility.

You can dodge this problem via static linking, but it can only get you so far. For example, fully static build of GUI application is nearly impossible. Static linkage also has disadvantages when it comes to keeping you software up to date. The famous example is OpenSSL - once you link it statically you take responsobility of updating your software (and distributing it to your users) when there's a security fix.

#### Creating DEB or RPM packages is hard

If you ever tried to write SPEC file for RPM or set of files for DEB packages you probably noticed that this is a lot harder than it should be. That's a bold statement of course, and some people will disagree. But this doesn't cancel the fact that you rarely see rpm and/or deb packages on GitHub releases section of small projects. Their authors often provide binaries for Windows, sometimes statically (or semi-statically - only with libc) linked cli tools packed in tar.gz, but rarely "proper" rpm or deb packages.

#### We have all infrastructure already, but it's not for ordinary developer

When you type `sudo apt install firefox` on Debian-based distro it willsearch for a package in all enabled repositories, download it, install it, make sure there're no conflicts that can break you system. This is fantastic invention. But it's not designed for you as an independent software developer. It's designed for distro maintainers.

If you wrote a program and want to make it available in Debian's repositories it's going to be hard. Repeat the same procedure for each distro you want to support. You probably won't be allowed to build statically some library that is available in that distro's repository, even if it's incompatible. Also forget about distributing propriatary software this way - it's an exception when distros accept closed source binaries into their repositories.

Official repositories are not AppStore, while they serve similar purpose from user persective, they designed for distributing OS itself. But you can use same tools as them and achieve the same user experience as `apt install my-awesome-program`. This is what OmniPackage does.
