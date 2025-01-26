<div align="center">
  
  # CBT SYSTEM

Frontend application the will be use for CBT SYSTEM

</div>

## Prerequisite

1. NodeJS (^18)
2. pnpm (package manager)

## Installation

1. Clone this repository

   ```sh
   git clone https://github.com/Mediko-id/cms-system.git
   ```

2. Install dependencies

   > NOTE: please use **pnpm**, don't use other package manager like _npm, yarn, etc_

   ```sh
   pnpm install
   ```

3. Run app

   ```sh
   pnpm dev
   # or
   pnpm run dev
   ```

## Workflow

1. Git

   We will use git for version control system, please use branching workflow if you want to make the new feature or
   others works.

2. Branch

   We will use 2 important branch for the workflow development

   - main (the main or production branch)
   - development (all the development process)

   There is not limited to only use 2 branch above, again if we want make a new feature please make the **new branch**
   from the source **development branch**.

3. Commit

   This project is already setup the checking commit message, so the commit message must follow the best practice commit
   message convention.

   The convention is follow this rules https://www.conventionalcommits.org/

4. Github

   All the source code will be saved on the remote repository (in this case Github), so after make changes in local,
   make sure to push the changes code to the Github.

5. Pull Request

   The changes of merging from the **2 important branch** (main, staging, and development) must be from the Pull Request
   flow, don't be directly push or merge the code when it's in the **2 important branch**.

## Folder Structure

```
.
└── cms-system/
    ├── .husky
    ├── .next
    ├── node_modules
    ├── public
    ├── src/
    │   ├── app
    │   ├── components/
    │   │   ├── atoms
    │   │   ├── layouts
    │   │   ├── molecules
    │   │   └── organisms
    │   ├── hooks
    │   ├── http
    │   ├── lib
    │   ├── stores
    │   ├── utils
    │   ├── validators
    │   └── types
    └── ...configfiles
```

- .husky : for the git hooks call manipulation
- .next : cache folder for nextjs
- node_modules : all dependencies of the app
- public : it's store all static files
- src : the main of source code app

  - app : the routing folder of nextjs
  - components : all the fraction of components site

    - atoms : smallest components
    - layouts : store the layout of pages
    - molecules : middle to large components (combination of atoms)
    - organisms : largest components (combination of atoms and molecules)

- hooks : custom react hooks
- http :http call api function
- lib : function related to local lib, like custom Axios, etc.
- stores : context related configuartion (redux, zustand, react-context, etc)
- utils : utilities custom function
- validators : validator function to validate data (like validate form, http request, etc)
- types : typescript custom types
