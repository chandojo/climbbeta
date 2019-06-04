## Getting Started

Virtualenv is used to run the Python environment and NodeJS to run the Javascript environment. Pip is used to manage Python packages and npm for Javascript packages. You can set up environment before or after installing the project repo. Install virtualenv, NodeJS, pip, and npm.

This project uses Django and React frameworks.

### Setting Up

1. Clone or download repository

  `git clone https://github.com/chandojo/climbbeta.git`

2. Create new virtualenv folder

  `virtualenv climbbeta-environ`

3. Activate virtual environment

  `source /climbbeta-environ/bin/activate`

4. CD into project directory and install requirements

  `pip install -r requirements.txt`

5. Install npm packages

  `npm install`


### Running the local environment

In project repository, run `python manage.py runserver`.  To run changes in front-end, run `npm run dev`. To change from Local to Production settings, comment necessary line in `/climbbeta/settings/__init__.py`.

## Testing
To run tests in Python backend:
1. `cd climbbeta` (root folder)
2. `python manage.py test`

## Contributing

We are happy you are interested in contributing to Climb Beta! Before getting started, read over our [Contributing Guidelines](CONTRIBUTING.md) to see how you can help.

## License

This project is licensed under the MIT License - see the [license.txt](license.txt) file for details
