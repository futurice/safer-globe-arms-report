import React, { Component } from 'react';
import PropTypes from 'prop-types';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Menu, { MenuItem } from 'material-ui/Menu';

// import HelpIcon from './../HelpIcon';
import './../../styles/components/forms/SelectMenu.css';

class SelectMenu extends Component {
  constructor(props) {
    super(props);

    const value = props.value
      ? !isNaN(props.value) ? parseInt(props.value, 10) : props.value
      : null;
    const selectedIndex = value
      ? props.options.findIndex(x => x.value === value)
      : -1;

    this.state = {
      open: false,
      anchorEl: null,
      selectedIndex: selectedIndex !== -1 ? selectedIndex : null,
    };
  }

  handleClick(index, val) {
    this.setState({ selectedIndex: index });
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
    const defaultLabel =
      this.props.options.length && this.state.selectedIndex !== null
        ? this.props.options[this.state.selectedIndex].text
        : this.props.label;

    return (
      <div className="select-menu">
        <List disablePadding={true}>
          <ListItem
            button
            style={{ paddingTop: '8px', paddingBottom: '8px' }}
            aria-haspopup="true"
            aria-controls={this.state.open ? `menu_${this.props.id}` : null}
            aria-label={this.props.label}
            onClick={this.openMenu.bind(this)}
          >
            <ListItemText primary={defaultLabel} />
          </ListItem>
        </List>
        <Menu
          id={this.state.open ? `menu_${this.props.id}` : null}
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onRequestClose={this.closeMenu.bind(this)}
        >
          <MenuItem
            selected={this.state.selectedIndex === null}
            onClick={event => this.handleClick(null, '')}
          />
          {this.props.options.map((option, index) =>
            <MenuItem
              key={index}
              selected={index === this.state.selectedIndex}
              onClick={event => this.handleClick(index, option.value)}
            >
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
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultOption: PropTypes.string,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func,
};

export default SelectMenu;
