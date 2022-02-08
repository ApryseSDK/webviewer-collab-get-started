# WebViewer Collaboration Get Started

The repo containing the code for the [WebViewer Collaboration get started guide.](https://collabortion.pdftron.com/docs/get-started)

## Prerequisites

This project assumes that you have Docker installed on your machine.
## Setup

Install dependencies by running `yarn`.

Navigate into the database module by running `cd node_modules/@pdftron/collab-db-postgresql`

Start up the PostgreSQL database by running 

```
yarn start-local-db --name collab --password pdftron
```

Then, run the following command to initialize and seed the database:

```
yarn init-db --password pdftron --dbName collab
```

## Usage

Start the server:
```
yarn start:server
```

In a different terminal, start the client with:
```
yarn start:client
```

The application will be running on http://localhost:1234