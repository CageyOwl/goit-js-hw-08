import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const formFields = {
  email: document.querySelector('[name="email"]'),
  message: document.querySelector('[name="message"]'),
};

// This function creates a structure containing values, obtained from the formField (structure of the form inputs)
function inputsToValuesStruct(inputsStruct) {
  const output = {};
  for (let field in inputsStruct) {
    output[field] = inputsStruct[field].value;
  }
  return output;
}

form.addEventListener(
  'input',
  throttle(function () {
    localStorage.setItem(
      'feedback-form-state',
      JSON.stringify(inputsToValuesStruct(formFields))
    );
  }, 500)
);

window.onload = () => {
  let storedFormState = {};
  try {
    storedFormState = JSON.parse(
      localStorage.getItem('feedback-form-state')
    );
  } catch (error) {
    console.log(`${error.name}\n${error.message}`);
    console.log('Storage will be flushed.');
    localStorage.removeItem('feedback-form-state');
    return;
  }
  

  for (let field in storedFormState) {
    if (storedFormState[field]) {
      formFields[field].value = storedFormState[field];
    }
  }
};

form.addEventListener(
  'submit',
  event => {
    event.preventDefault();
    console.log(inputsToValuesStruct(formFields));
    form.reset();
    localStorage.removeItem('feedback-form-state');
  },
  true
);
