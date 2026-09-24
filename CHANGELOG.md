# Change Log
## 1.0.8 - 15/9/2026

- When selecting between multiple workspace folders, repos with unpushed commits are now prefixed with an asterisk (*)
- Added *git-tag-push.behavior.markUnpushedRepos* setting to control the unpushed-commits asterisk indicator (default: on)

## 1.0.7 - 19/1/2026

- Support multiple workspace folders (Thanks to trashhead)

## 1.0.6 - 05/11/2025

- Now also supports pre release versions:
    1.0.3-rc.3 -> 1.0.3-rc.4
    1.0.3-alpha1 -> 1.0.3-alpha2

- If no latest tag is found, user is asked to create one

## 1.0.5 - 05/11/2025

- Now also supports pre release versions:
    1.0.3-rc.3 -> 1.0.3-rc.4
    1.0.3-alpha1 -> 1.0.3-alpha2

- If no latest tag is found, user is asked to create one

## 1.0.4 - 28/09/2020

- If the tag follows SemVer, automatically try and increment patch number.


## 1.0.3 - 25/09/2020

- Added initial value to tag, will use the latest tag.


## 1.0.2 - 29/07/2020

- Improved error handling on failed push
- Added cleanup of created tags on failed push


## 1.0.0 - 29/07/2020

- Initial release