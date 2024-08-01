# LaVague QA: Usage guide

!!! warning "Early release"
    LaVague QA is still a work in progress and may contain bugs. Join our [community of amazing contributors](https://discord.gg/invite/SDxn9KpqX9) to help make this tool more reliable!

## Installation

LaVague QA uses `gpt-4o` models by default, as such, you will need to define `OPENAI_API_KEY` as an environment variable before running LaVague. 

### Install with pip

Install the latest release of our package with `pip`

```
pip install lavague-qa
```

### Install from source

Install from the latest repository source

Clone the [LaVague](https://github.com/lavague-ai/LaVague) repository

```sh
git clone https://github.com/lavague-ai/LaVague.git
```

Navigate to the `lavague-qa` package
```
cd LaVague/lavague-qa
```

Install with pip
```
pip install -e .
```


## Default usage

Run `lavague-qa --help` to see all available arguments

```
Usage: lavague-qa [OPTIONS]

Options:
  -u, --url TEXT      URL of the site to test
  -f, --feature TEXT  Path to the .feature file containing Gherkin
  -llm, --full-llm    Enable full LLM pytest generation
  -h, --headless      Enable headless mode for the browser
  -db, --log-to-db    Enables logging to a SQLite database
  --help              Show this message and exit.
```

Run `lavague-qa` with a `URL` and a `.feature` file to generate tests

!!! tip "OPENAI_API_KEY"
    If you haven't already set a valid OpenAI API Key as the `OPENAI_API_KEY` environment variable in your local environment, you will need to do that now.

```bash
lavague-qa --url https://example.com --feature example.feature
```

LaVague will create a new directory containing your feature file and the python file

```
- Feature file: ./generated_tests/example.feature
- Pytest file: ./generated_tests/example.py

Tests successfully generated
 - Run `pytest ./generated_tests/example.py` to run the generated test.
```

Run the tests with `pytest` to validate their behavior

```bash
pytest ./generated_tests/example.py
=========================== test session starts ===========================
platform darwin -- Python 3.10.14, pytest-8.2.1, pluggy-1.5.0
rootdir: /Users/
configfile: pyproject.toml
plugins: anyio-4.3.0, bdd-7.1.2
collected 1 item                                                                                                                                                                                                                                         

generated_tests/example.py .                                                                                                                                                                                                               [100%]

=========================== 1 passed in 16.03s ===========================

```


## Advanced usage

### Pytest generation strategies

- By default, LaVague attempts to minimize reliance on LLMs in order to optimize costs. 
- It rebuilds 90% of the pytest file deterministically and only relies on LLMs for the assert generation. 
- This default option may result in reduced reliability, especially if the LaVague agent doesn't conduct steps exactly as they are defined in the feature file. 

**In this case, you can attempt to generate the files entirely with an LLM by adding the `-llm` flag**

```bash
lavague-qa -llm --url https://example.com --feature example.feature
```

## Learn more

- Learn about advanced usage and customization in our [Customization guide](./customization.md)
- Learn more about how we built this tool in our [Walkthrough](./walkthrough.md)

Join our [Discord](https://discord.gg/invite/SDxn9KpqX9) to reach our core team and get support!