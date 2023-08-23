import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

const SearchBar = ({valueRef,setSearchQuery, formSubmit}) => (
    <form onSubmit={formSubmit}>
      <TextField
        sx={{my:2}}
        id="search-bar"
        className="text"
        label="Search for a flavor"
        variant="outlined"
        placeholder="eg. Chocolate"
        size="medium"
        InputLabelProps={{ shrink: true }}
        inputRef={valueRef}   //connecting inputRef property of TextField to the valueRef
        InputProps={{
            endAdornment: (
                <InputAdornment>
                <IconButton color="secondary">
                    <SearchIcon onClick={formSubmit}/>
                </IconButton>
                </InputAdornment>
            )
          }}    
        fullWidth
      />
    </form>
  );

export default SearchBar;