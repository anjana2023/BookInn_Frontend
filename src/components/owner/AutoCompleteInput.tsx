import { ChangeEvent, FC, useState } from "react";
import getPlaces from "../../api/getPlace";
import { DebounceInput } from "react-debounce-input";

interface AutoCompleteProps {
  setFormData: any;
  searchLocation: string;
}

const AutoCompleteInput: FC<AutoCompleteProps> = ({
  setFormData,
  searchLocation,
}) => {
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleInputChange(event.target.value);
  };

  const handleInputChange = async (query: string) => {
    const suggesions = await getPlaces(query);
    setSuggestions(suggesions);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const searchLocation = suggestion.place_name.split(",")[0];
    const latitude = suggestion.center[1];
    const longitude = suggestion.center[0];
  

    setFormData({
      searchLocation,
      location: [longitude, latitude] ,
    });
    setSuggestions([]);

  };
  /**
   * * Used debounceInput to reduce no of call to the places api from mapbox
   */
  return (
    <>
      <DebounceInput
        type="text"
        name="searchLocation"
        placeholder="search...."
        minLength={1}
        debounceTimeout={500}
        value={searchLocation}
        onChange={handleChange}
        className="w-full py-3 px-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <ul className="mt-2 w-full bg-white shadow-lg rounded-lg overflow-hidden">
        {suggestions?.map((suggestion: any, index) => (
          <li
            key={index}
            onClick={() => handleSuggestionClick(suggestion)}
            className="px-4 py-3 cursor-pointer hover:bg-gray-100"
          >
            {suggestion.place_name}
          </li>
        ))}
      </ul>
    </>
  );
};
export default AutoCompleteInput;
