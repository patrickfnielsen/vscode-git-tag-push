# Git: Tag & Push
## Features
- A simple extension to create a git tag and push it afterwards.
- Can automatically increment SemVer patch number (disabled by default)
- Can suggest latests tag

&nbsp;

## Settings
The following settings exists to control the behavior of tag handling:

*git-tag-push.behavior.incrementSemVer* - If enabled it will automatically try and increment the patch number (requires the tag to be SemVer compliant).

*git-tag-push.behavior.suggestLatestTag* - If enabled it will suggest the last tag as the default value, disabling this also disables SemVer increments.

&nbsp;

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