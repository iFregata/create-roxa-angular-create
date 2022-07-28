# {{capital name space=true}} Web Application

{{description}}

## The Directory structure

```bash
.
├── dist                          # Build directory
└── src                           # Source directory
    ├── app                       # Application directory
    │   ├──  auth                 # Authentication module
    │   ├──  item                 # An example module of Item CRUD
    │   ├──  main                 # The home page module
    │   ├──  models               # Data models
    │   ├──  services             # The WebAPI calls services
    │   ├──  store                # A global state management
    ├── test                      # The unit test codes.              
    └── types                     # Type declarations
    ...
```

## Dependencies

### typescript 4.6.2

### angular 13.3.0 & angular/cli 13.3.8

```bash

npm install -g @angular/cli@13

ng new {{name}} --minimal --skip-install --skip-git --commit -s false -t false

cd {{name}}

npm install

npm install angular-in-memory-web-api@0.13.0 --save

```

### ng-zorro-antd 13.3.2

```bash

ng add ng-zorro-antd@13.3.2

```

### ngxs 3.7.4

```bash

npm install @ngxs/{store,logger-plugin,router-plugin,storage-plugin}@3.7.4 --save

npm install @ngxs/form-plugin@3.7.4 --save

npm install @ngxs/storage-plugin@3.7.4 --save

```

### auth0/angular-jwt 5.0.2

### faker-js/faker 7.3.0

## Code generating commands

### Creating main module

```bash

ng g m main -m app --route=main --routing

```

### Creating auth module

```bash

ng g m auth -m app

ng g c auth -m auth --change-detection OnPush -t false --skip-tests

```

### Creating services

```bash

ng g s services/InMemoryData

ng g s services/auth

```

### Creating item module and compoments

```bash

ng g m item -m main --route=main --routing

ng g c item/item-list -m item --change-detection OnPush -t false -s --skip-tests
ng g c item/item-list/item-list-table -m item --change-detection OnPush -t false -s --flat --skip-tests

ng g c item/item-desc -m item --change-detection OnPush -t false -s --skip-tests
ng g c item/item-desc/item-desc-fields -m item --change-detection OnPush -t false -s --flat --skip-tests

ng g c item/item-create -m item --change-detection OnPush -t false -s --skip-tests
ng g c item/item-create/item-create-form -m item --change-detection OnPush -t false -s --flat --skip-tests

ng g c item/item-edit -m item --change-detection OnPush -t false -s --skip-tests
ng g c item/item-edit/item-edit-form -m item --change-detection OnPush -t false -s --flat --skip-tests

ng g c item/item-dup -m item --change-detection OnPush -t false -s --skip-tests
ng g c item/item-dup/item-dup-form -m item --change-detection OnPush -t false -s --flat --skip-tests

ng g r item/item-resolve --skip-tests

```

### Command templates

```bash

ng new <project_name> --minimal --skip-install --skip-git --commit -s false -t false --package-manager yarn


ng g m <module_name> -m app --route=<module_route> --routing

ng g c <module_path>/<component_name> -m <module_name> --change-detection OnPush -t false --skip-tests
ng g c <module_path>/<component_folder>/<component_name> -m <module_name> --change-detection OnPush -t false --flat --skip-tests

ng g g path/to/<guard_name> --implements=CanActivate

ng g s path/to/<service_name>

ng g r path/to/<resolver_name> --skip-tests

ng g interceptor path/to/<interceptor_name> --skip-tests

```

## Build

```bash

ng build --base-href /{{name}}/

docker build -f docker/Dockerfile . -t {image_registry_url}/{image_name}:{image_tag}

docker push {image_registry_url}/{image_name}:{image_tag}

```

## Serve

```bash

ng serve --open

```

Mock user: foo@bar.com, pass: bar

## References

* [NodeJS](https://nodejs.org/en/)
* [NPM](https://www.npmjs.com/)
* [NVM](https://github.com/nvm-sh/nvm)
* [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
* [TypeScript](https://www.typescriptlang.org/docs/)
* [Angular](https://angular.io)
* [NGXS](https://www.ngxs.io)
* [NG-ZORRO](https://ng.ant.design/docs/introduce/en)
* [Fakerjs](https://github.com/faker-js/faker)