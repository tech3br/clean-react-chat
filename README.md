<center><h1>Bunq Frontend Test</h1></center>

##  **Installation**

**You must first have installed [NodeJS](https://nodejs.org/) in its 14 version (I recommend [nvm](https://github.com/nvm-sh/nvm) to deal with versions), [Yarn](https://yarnpkg.com/), and then:**


Step 1:

`cd bunq-test` - access the project files

Step 2:

`yarn` (or `npm install`) - to install dependencies

Step 3:

`yarn dev` (or `npm run dev`) - to initialize the project under development

Observations:

`yarn test` (or `npm run test`) - to run jest unit testing

`yarn test:e2e` (or `npm run test:e2e`) - to run cypress e2e testing (if you use linux or windows, the command may change because of the \, but you can change the script or run it by `node_modules/.bin/cypress open`)

`yarn start` (or `npm start`) - to initialize the project under production webpack;

In the package.json file, there are scripts that you can run with node and yarn

<hr />
<br />

## **Architecture**

The architecture used in this project was the [Clean Architecture](https://dev.to/rubemfsv/clean-architecture-the-concept-behind-the-code-52do), using the concepts proposed by Robert Martin.


```
cypress/
src/
  data/
    protocols/
    test/
    usecases/
  domain/
    errors/
    models/
    test/
    usecases/
  infra/
    cache/
    http/
    test/
  main/
    adapters/
    config/
    decorators/
    factories/
      cache/
      decorators/
      http/
      pages/
      usecases/
    routes/
    scripts/
    index.tsx
  presentation/
    assets/
      fonts/
      images/
    components/
    hooks/
    pages/
    protocols/
    routes/
    styles/
    test/
    utils/
  validation/
    errors/
    protocols/
    test/
    validators/
```
<br />

**Login page**

![Login page](https://res.cloudinary.com/practicaldev/image/fetch/s--jXz3O6iW--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/rfe1wwsnge9iiv1qjp7b.png)

**Dashboard page**

![Dashboard page](https://res.cloudinary.com/practicaldev/image/fetch/s--azbQZcb5--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qxuqjsiw1pplp466f8i2.png)

**New conversation page**

![New conversation page](https://res.cloudinary.com/practicaldev/image/fetch/s--ebD2-B7k--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1uupaobfloo4y1pi93n1.png)

**Individual chat message page**

![Individual chat page](https://res.cloudinary.com/practicaldev/image/fetch/s--cq3mVmR0--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vcrx6ek6004kh5r7vbqq.png)

**Group chat message page**

![Group chat page](https://res.cloudinary.com/practicaldev/image/fetch/s--Gwu3MZLt--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/fdd97s5uzeahwh231qii.png)

**Group details popup**

![Group chat page](https://res.cloudinary.com/practicaldev/image/fetch/s--SOkGQ7mo--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/epd701ls7jxu9ic9vvpe.png)

**Unit testing**

![Test suites](https://res.cloudinary.com/practicaldev/image/fetch/s--MUpejTAI--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/n45pikamc6lo6cplbrca.png)

**E2E test flows**

![Test suites](https://res.cloudinary.com/practicaldev/image/fetch/s--yPo9NUTq--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/og1pfpofogkzk4pj1gzr.png)

**E2E test result**

![Test suites](https://res.cloudinary.com/practicaldev/image/fetch/s--Lz7reck3--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_800/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/m8odftsfnpbc0deri2ef.png)

<hr />
<br />


