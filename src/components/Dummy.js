class CreateTentPage extends React.Component {
  static defaultProps = {
    votesToSkip: 2,
    guestCanPause: true,
    update: false,
    tentCode: null,
  }


  constructor(props) {
    super(props);
    this.state = {
      guestCanPause: this.props.guestCanPause,
      votesToSkip: this.props.votesToSkip,
      errorMessage: "",
      successMessage: "",
    };

    this.handleTentButtonPressed = this.handleTentButtonPressed.bind(this);
    this.handleVotesChange = this.handleVotesChange.bind(this);
    this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
    this.handleUpdateButtonPressed = this.handleUpdateButtonPressed.bind(this);
  }

  handleVotesChange(e) {
    this.setState({
      votesToSkip: e.target.value,
    });
  }

  handleGuestCanPauseChange(e) {
    this.setState({
      guestCanPause: e.target.value === "true" ? true : false
    })
  }

  handleTentButtonPressed () {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
      }),
    };
    fetch("/api/create-tent", requestOptions)
    .then((response) => response.json())
    .then((data) => this.props.history.push("/tent/" + data.code));
  }

  handleUpdateButtonPressed() {
    const requestOptions = {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votes_to_skip: this.state.votesToSkip,
        guest_can_pause: this.state.guestCanPause,
        code: this.props.tentCode,
      }),
    };
  
    fetch("/api/update-tent", requestOptions)
      .then((response) => {
        if (response.ok) {
          console.log("")
          this.setState({
            successMessage: "Room Updated Successfully!",
          })
        } else {
          this.setState({
            errorMessage: "Error Updating Room...",
          })

        }
        this.props.updateCallback();
      });
  }


  renderCreateButtons() {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
          <Button color="primary" variant="contained" onClick={this.handleTentButtonPressed}>
            Create A Tent
          </Button>
        </Grid>
        <Grid item xs={12} align="center">
          <Button color="secondary" variant="contained" to="/" component={Link}>
            Back
          </Button>
        </Grid>
      </Grid>
    )
  }


  renderUpdateButtons() {
    return (
        <Grid item xs={12} align="center">
          <Button
            color="primary"
            variant="contained"
            onClick={this.handleUpdateButtonPressed}
          >
            Update Tent
          </Button>
        </Grid>
    );
  }


  render() {
    const title = this.props.update ? "Update Tent" : "Create a Tent"

    return (
      <Grid container spacing={1}>
        <Grid item xs={12} align="center">
         <Collapse in={this.state.errorMessage != "" || this.state.successMessage != ""}>
          {this.state.successMessage != "" 
          ? (<Alert 
              severity="success" 
              onClose={() => {this.setState({successMessage: ""})}}>
                {this.state.successMessage}
              </Alert>
        ) : (<Alert 
              severity="error" 
              onClose={() => {this.setState({errorMessage: ""})}}>
                {this.state.errorMessage});
              </Alert>)}
         </Collapse>
        </Grid>
        <Grid item xs={12} align="center">
          <Typography component="h4" variant="h4">
            {title }
          </Typography>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl component="fieldset">
            <FormHelperText>
              <div align="center">
                Guest Control of Playback State
              </div>
            </FormHelperText>
            <RadioGroup row defaultValue={this.props.guestCanPause.toString()} onChange={this.handleGuestCanPauseChange}>
              <FormControlLabel value="true" 
                                control ={<Radio color="primary"/>}
                                label="Play/Pause"
                                labelPlacement="bottom"
                                />
              <FormControlLabel value="false" 
                                control ={<Radio color="secondary"/>}
                                label="No Control"
                                labelPlacement="bottom"
                                />
                                
            </RadioGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12} align="center">
          <FormControl>
            <TextField 
              required={true} 
              type="number"
              onChange={this.handleVotesChange}
              defaultValue={this.state.votesToSkip}
              inputProps={{
                min: 1,
                style: {textAlign: "center"}
              }}>
              </TextField>
                <FormHelperText>
                  <div align="center">
                    Votes Requires to Skip Song
                  </div>
                </FormHelperText>
          </FormControl>
        </Grid>
        {this.props.update 
        ? this.renderUpdateButtons()
        : this.renderCreateButtons()}
      </Grid>
    );
    
  }
}


export default CreateTentPage;


