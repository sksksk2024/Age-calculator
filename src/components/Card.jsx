import { useState } from 'react';
import ArrowDown from './../images/icon-arrow.svg';

function Card() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');

  const [calculatedDay, setCalculatedDay] = useState('--');
  const [calculatedMonth, setCalculatedMonth] = useState('--');
  const [calculatedYear, setCalculatedYear] = useState('--');

  const [errorMessages, setErrorMessages] = useState({
    day: '',
    month: '',
    year: '',
  });
  const [isError, setIsError] = useState(false); // Track if there's any error

  const validateInputs = () => {
    const errors = { day: '', month: '', year: '' };
    let hasError = false;

    if (!day || day < 1 || day > 31) {
      errors.day = 'Please enter a valid day (1-31).';
      hasError = true;
    }
    if (!month || month < 1 || month > 12) {
      errors.month = 'Please enter a valid month (1-12).';
      hasError = true;
    }
    if (!year || year < 1900 || year > 2024) {
      errors.year = 'Please enter a valid year (1900-2024).';
      hasError = true;
    }

    setErrorMessages(errors);
    setIsError(hasError);

    return !hasError;
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent form submission reload

    if (validateInputs()) {
      const today = new Date();
      const inputDate = new Date(`${year}-${month}-${day}`);
      const diffTime = today - inputDate;

      if (diffTime >= 0) {
        const diffDate = new Date(diffTime);
        const calculatedYears = diffDate.getUTCFullYear() - 1970;
        const calculatedMonths = diffDate.getUTCMonth();
        const calculatedDays = diffDate.getUTCDate() - 1;

        setCalculatedYear(calculatedYears);
        setCalculatedMonth(calculatedMonths);
        setCalculatedDay(calculatedDays);

        // Reset error messages
        setErrorMessages({ day: '', month: '', year: '' });
        setIsError(false);
      } else {
        setErrorMessages({
          day: '',
          month: '',
          year: 'The selected date is in the future.',
        });
        setIsError(true);
      }
    }
  };

  return (
    <section className="bg-white p-16P p-32P rounded-20BR rounded-br-150BR relative">
      {/* Form */}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form text-smokey-grey flex flex-col sm:flex-row justify-start items-start gap-8">
          <div className="flex flex-col items-start justify-center">
            <label
              className={`uppercase tracking-0.2 font-semibold text-xs 2xs:text-md ${
                isError ? 'text-light-red' : ''
              }`}
              htmlFor="day"
            >
              Day
            </label>
            <input
              onChange={(e) => setDay(e.target.value)}
              value={day}
              aria-label="day birth"
              className={`bg-white font-bold p-16P rounded-5BR w-128W sm:w-160W md:w-200W text-lg 2xs:text-xl border-solid border-1BW ${
                errorMessages.day ? 'border-light-red text-light-red' : 'border-light-grey'
              } focus:outline-none hover:border-purple hover:cursor-pointer`}
              name="day"
              id="day"
              type="number"
              placeholder="DD"
              min={1}
              max={31}
            />
            {errorMessages.day && (
              <p className="text-light-red text-xs mt-1">{errorMessages.day}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-center">
            <label
              className={`uppercase tracking-0.2 font-semibold text-xs 2xs:text-md ${
                isError ? 'text-light-red' : ''
              }`}
              htmlFor="month"
            >
              Month
            </label>
            <input
              onChange={(e) => setMonth(e.target.value)}
              value={month}
              aria-label="month birth"
              className={`bg-white font-bold p-16P rounded-5BR w-128W sm:w-160W md:w-200W text-lg 2xs:text-xl border-solid border-1BW ${
                errorMessages.month ? 'border-light-red text-light-red' : 'border-light-grey'
              } focus:outline-none hover:border-purple hover:cursor-pointer`}
              name="month"
              id="month"
              type="number"
              placeholder="MM"
              min={1}
              max={12}
            />
            {errorMessages.month && (
              <p className="text-light-red text-xs mt-1">{errorMessages.month}</p>
            )}
          </div>

          <div className="flex flex-col items-start justify-center">
            <label
              className={`uppercase tracking-0.2 font-semibold text-xs 2xs:text-md ${
                isError ? 'text-light-red' : ''
              }`}
              htmlFor="year"
            >
              Year
            </label>
            <input
              onChange={(e) => setYear(e.target.value)}
              value={year}
              aria-label="year birth"
              className={`bg-white font-bold p-16P rounded-5BR w-128W sm:w-160W md:w-200W text-lg 2xs:text-xl border-solid border-1BW ${
                errorMessages.year ? 'border-light-red text-light-red' : 'border-light-grey'
              } focus:outline-none hover:border-purple hover:cursor-pointer`}
              name="year"
              id="year"
              type="number"
              placeholder="YYYY"
              min={1900}
              max={2024}
            />
            {errorMessages.year && (
              <p className="text-light-red text-xs mt-1">{errorMessages.year}</p>
            )}
          </div>
        </div>

        {/* Separation Line and Button Results */}
        <div className="my-32M sm:my-64M grid grid-cols-10 items-center">
          <hr className="col-span-8 sm:col-span-9" />
          <button type="submit">
            <img
              className="col-span-2 sm:col-span-1 p-16P rounded-full bg-purple hover:bg-off-black absolute w-48W sm:w-64W bottom-112I xs:bottom-182.4I sm:bottom-208I md:bottom-256I"
              src={ArrowDown}
              alt="click for age results"
            />
          </button>
        </div>
      </form>

      {/* Results */}
      <div className="flex flex-col leading-none justify-center items-start">
        <h1 className="text-xl xs:text-3xl md:text-4xl italic font-bold text-off-black">
          {errorMessages.year || errorMessages.month || errorMessages.day ? (
            <span className="text-purple tracking-widest">--</span> )
          : (
            <span className="text-purple tracking-widest">{calculatedYear}</span>
        )}
          years
        </h1>
        <h1 className="text-xl xs:text-3xl md:text-4xl italic font-bold text-off-black">
          {errorMessages.year || errorMessages.month || errorMessages.day ? (
            <span className="text-purple tracking-widest">--</span> )
          : (
            <span className="text-purple tracking-widest">{calculatedMonth}</span>
        )}
          months
        </h1>
        <h1 className="text-xl xs:text-3xl md:text-4xl italic font-bold text-off-black">
        {errorMessages.year || errorMessages.month || errorMessages.day ? (
          <span className="text-purple tracking-widest">--</span> )
          : (
          <span className="text-purple tracking-widest">{calculatedDay}</span>
        )}
          days
        </h1>
      </div>
    </section>
  );
}

export default Card;