## Getting Started

Climbbeta runs in a Python 3.6.3 virtual environment. NodeJS is used to run the Javascript environment. Pip is used to manage Python packages and npm for Javascript packages. You can set up environment before or after installing the project repo. Install virtualenv, NodeJS, pip, and npm.

This project uses Django and React frameworks.

## Setting Up

1. In your local working directory, clone or download repository

  `git clone https://github.com/chandojo/climbbeta.git`

2. Create virtual environment **(must be in Python 3)**

  `python3 -m venv climbbeta-environ`

3. Activate virtual environment

  `source ./climbbeta-environ/bin/activate`

4. CD into project directory and install requirements

  `pip install -r requirements.txt`

5. Install npm packages

  `npm install`


### Running the local environment

In project repository, run `python manage.py runserver`.  While initially setting up your environment, you may need to create a build a main.js file for React.  To do this, run `npm run dev`.

### Environment Variables
This project heavily relies on environment variables. For the website to fully render on your local machine, be sure to define the following environment variables:

- CLIMB_BETA_SECRET_KEY (Django secret key)
- PRODUCTION_SETTING ('true' for production, 'false' for local)
- REACT_APP_GOOGLE_EMBED_KEY (Google Maps api key)
- REACT_APP_WEATHER_KEY (Open Weather Map api key)
- GOOGLE_API_KEY (Google YouTube api key)
- VIMEO_ACCESS_TOKEN
- VIMEO_CLIENT_ID
- VIMEO_CLIENT_SECRET

## Making changes

### Making changes to React

When making changes to React, make sure to update the main.js file.  If you do *not* update the main.js file, your changes will *not* render.     

- Update locally
  `npm run dev`

- Update for production.
  `npm run build`

### Local and Production Settings

Create environment variable called 'PRODUCTION_SETTING' and set as 'true' for production setting and 'false' for local setting.

## Testing
To run tests for Django:
1. `cd climbbeta` (root folder)
2. `python manage.py test`

To run test for React:
`npm test`

## Contributing

We are happy you are interested in contributing to Climb Beta! Before getting started, read over our [Contributing Guidelines](CONTRIBUTING.md) to see how you can help.

## License

This project is licensed under the MIT License - see the [license.txt](license.txt) file for details
