var React = require('react');

var QuoteContainer = require('./QuoteContainer');

var Quote = React.createClass({
  render() {
    return (
      <QuoteContainer >
        <p>This is a quote</p>
      </QuoteContainer>
    )
  }
});

module.exports = Quote;
