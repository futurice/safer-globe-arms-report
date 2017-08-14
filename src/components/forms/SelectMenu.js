import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';

// import HelpIcon from './../HelpIcon';
import './../../styles/components/forms/SelectMenu.css';

class SelectMenu extends Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      anchorEl: null,
    };
  }

  handleClick(val) {
    this.props.onChange(this.props.id, val);

    this.closeMenu();
  }

  openMenu(event) {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  closeMenu() {
    this.setState({
      open: false,
      anchorEl: null,
    });
  }

  render() {
    return (
      <div className="select-menu">
        <Button
          aria-owns={this.state.open ? `menu_${this.props.id}` : null}
          aria-haspopup="true"
          onClick={this.openMenu}
        >
          {this.props.label}
        </Button>
        <Menu
          id={`menu_${this.props.id}`}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.closeMenu}
        >
          {this.props.options.map((option, i) =>
            <MenuItem key={i} onClick={() => this.handleClick(option.value)}>
              {option.text}
            </MenuItem>,
          )}
        </Menu>
      </div>
    );
  }
}

SelectMenu.defaultProps = {
  helpIcon: false,
};

SelectMenu.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  helpIcon: PropTypes.bool,
  defaultOption: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default SelectMenu;
