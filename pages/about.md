---
layout: default
title: About
permalink: /about
---

#### Distributing software for GNU/Linux is [hard](https://www.youtube.com/watch?v=Pzl1B7nB9Kc){:target="_blank"}

On Windows and macOS, you can build a binary, publish it on your website, and be reasonably sure that users will be able to download, install, and run your application. On Linux, this is nearly impossible due to the incompatible ABI between different distros and even different versions of the same distro.

There are ways to approximate this "Windows experience", for example, via static linkage or by using intaller frameworks and maintaining different binaries for different ABIs. But all these are tricky to do and have limitations. On top of that, Linux users are not used to downloading install_whatever.exe and running it; they are used to apt/dnf/zypper install, preferably from their distro's repository.

#### Creating DEB or RPM packages is hard

These two are the most popular package formats for Linux; they've been around for ages, and for those who came from Windows, these packages look similar to "install.exe". But they are designed and used for different purposes—making the distro itself. The Linux distro is essentially a set of packages. Whatever maintainers put into official repositories is the distro; you just install a subset of it.

If you ever tried to write a SPEC file for RPM or a set of files for DEB packages, you probably noticed that this is harder than it should be. That's because your use case is probably not what these packages are designed for. You probably want to build your awesome software and share it with friends and users. Distro maintainers need to support different CPU architectures, apply patches, manage dependencies (sometimes conflicting), at scale thousands of packages that together make a distro.

#### We have all infrastructure already, but it's not for ordinary developer

Being able to `sudo apt install firefox` is fantastic. But it's not designed for you as an independent software developer, while it's possible to push your software to the official repositories of some distros, and even more, if your software is so good and popular, maintainers will probably do it for you.

If you write a program and want to make it available in some distro's repository, it's going to be hard. You probably won't be allowed to build statically some library that is available in that distro, even if it's incompatible, and you need to maintain 15 more distros, all with their own shenanigans, different libraries' versions, etc. Also, forget about distributing proprietary software this way; it's an exception when distros accept closed-source binaries into their repositories, and it's very unlikely that you'll be allowed to do this. Repeat the same procedure for each distro you want to support. That's a massive effort.

#### Official repositories are not AppStore

While they serve similar purpose from user persective, they designed for distributing OS itself. Luckily you can use same tools as them and achieve the same user experience as `apt install my-awesome-program`. **This is what OmniPackage does**.

OmniPackage offers a streamlined workflow for building and distributing packages that is focused on independent developers, not distro maintainers.

1. Makes it easier to create files necessary for building RPM and DEB packages (`omnipackage` cli tool that helps you create spec files);
2. Builds those packages for multiple distros (spawns `rpmbuild` or `dpkg-buildpackage` for each distro inside a container);
3. Creates and manages repositories for those packages (sign packages and upload them to the S3 bucket, which serves as a respository).

Users need to add those repositories, and once they do that, they get the apt/dnf/zypper install experience with your package.

#### What about Flatpak, Snap, AppImage

The problem with distributing Linux software is well known, and many have tried to solve it.

Flatpak and Snap maintain their own runtimes that they can control and make sure the ABI is compatible across all distros, essentially bypassing the fundamental issue (sweeping it under the rug). To do this, they implement a massive amount of clever hacks while adding some new features like isolation for additional security. On top of that, they provide an AppStore-like experience for users and developers. They are almost "Docker for desktop software.".

AppImage is essentially static linkage; it packs all your dependencies into one archive suitable for many distros without the need for actual static. This gives a "Windows-like" experience when you can build appimage, put it on your site, and users will probably be able to run it.

[AUR](https://aur.archlinux.org/){:target="_blank"} gives Arch Linux users the ability to distribute recepies for building their software.

[Nix](https://nixos.org/){:target="_blank"} goes in a fundamentally different direction; while clever and impressive, like AUR it works only within one distro.

Having many different ways to do the same thing could be a blessing and a curse. But this is what Linux and open source in general are all about. Now you have yet another thing that helps you distribute software for Linux. Choose wisely.

OmniPackage is inspired by [openSUSE Build Service](https://build.opensuse.org/){:target="_blank"}
