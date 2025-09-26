---
title: Installing Common Tools
short_title: Install CT
description: How to install the Common Tools runtime
subject: Tutorial
subtitle: How to install the Common Tools runtime
authors:
  - name: Ellyse Cedeno
    email: ellyse@common.tools
keywords: commontools, install
abstract: |
  In this section, we install the code and servers need to run the Common Tools runtime locally.
---
## Install Common Tools

Getting the basic Common Tools runtime up and running locally consists of 3 steps
1. Install Deno
1. Get the code
1. Configure any AI or extra services you want to run locally
1. Run the servers (Toolshed and Shell)

We'll go over each of these steps.

## Install Deno

You can visit [Deno's website](https://docs.deno.com/runtime/getting_started/installation/) for more information about how to install Deno on your system.

::::{tab-set}
:::{tab-item} Mac
:sync: tab1
**Shell**
```bash
curl -fsSL https://deno.land/install.sh | sh
```

**Homebrew**

```bash
brew install deno
```

**MacPorts**

```bash
sudo port install deno
```
:::
:::{tab-item} Linux
:sync: tab2
**Shell**
```bash
curl -fsSL https://deno.land/install.sh | sh
```

**npm**

```bash
npm install -g deno
```

**Nix**

```bash
nix-shell -p deno
```
:::
:::{tab-item} Windows
:sync: tab3
You really expected us have docs for programming on Windows? 😂

[WSL](https://learn.microsoft.com/en-us/windows/wsl/install) might be a good option.
::::

## Getting the Code
All the source code you need is available at
[https://github.com/commontoolsinc/labs.git](https://github.com/commontoolsinc/labs.git)

```
$ git clone https://github.com/commontoolsinc/labs.git
$ cd labs
```

## Configuration 
If you plan on running any of the API services that Toolshed supplies, set the
`API_URL` environment variable.
```
$ export API_URL="http://localhost:8000"
```

If you plan to run LLM calls, you will need to give Toolshed your API keys for the LLM services.
See `./packages/toolshed/env.ts` for a list of LLMs supported and their associated environment variable.
The current default LLM is Claude, therefore setting the Anthropic key is really the only
requirement.
```
$ export CTTS_AI_LLM_ANTHROPIC_API_KEY=<INSERT_YOUR_ANTHROPIC_KEY>
```

## Run the servers
You'll need to run two servers (at the same time). The first one is the backend server, Toolshed. The following command will run toolshed on its default port 8000. Note: the previous exported environment variables are important only for Toolshed. So make sure they are set in this shell instance.
```
$ cd ./packages/toolshed
$ deno task dev
```

Next, is the front-end server, Shell. The following command will run shell on its default port 5173.
```
$ cd ./packages/shell
$ deno task dev-local
```

Now the servers should be running and you can navigate to [http://localhost:5173/](http://localhost:5173/) to see a not-too-exciting-yet charm.
