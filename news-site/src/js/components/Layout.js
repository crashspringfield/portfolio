import React from "react";
// import Footer from "./Footer";
// import Header from "./Header";

export default class Layout extends React.Component {
  render() {
    return (
      <h1>Killer News
      </h1>
    );
  }
}

// from early tutorials but useful for Zizek App
//
/*
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "Welcome",
    };
  }

  changeTitle(title) {
    this.setState({title});
  }

  render() {
    return (
      <div>
        <Header
          changeTitle={this.changeTitle.bind(this)}
          title={this.state.title} />
        <Footer />
      </div>
    );
  }
}
*/
