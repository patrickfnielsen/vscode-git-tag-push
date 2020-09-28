# Git: Tag & Push
## Features
A simple extension to create a git tag and push it afterwards.

If the tag follows SemVer, it will automatically increment the patch number. If its not the newest tag will be displayed per default.

You can find the command under "Git: Tag & Push", it will ask for the version tag and a optional message.


## Settings
The following settings exists to control the behavior of tag handling:

git-tag-push.behavior.incrementSemVer

git-tag-push.behavior.suggestLatestTag


## Release Notes
## 1.0.4 - 28/09/2020

- If the tag follows SemVer, automatically try and increment patch number.


## 1.0.3 - 25/09/2020

- Added initial value to tag, will use the latest tag.


## 1.0.2 - 29/07/2020

- Improved error handling on failed push
- Added cleanup of created tags on failed push


### 1.0.0 - 29/07/2020

- Initial release of Git: Tag & Push