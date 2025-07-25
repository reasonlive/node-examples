import React from "react";

class CustomSelect extends React.Component {
    constructor(props) {
        super(props);

        // @defaultSelectText => Show default text in select
        // @showOptionList => Show / Hide List options
        // @optionsList => List of options
        this.state = {
            showOptionList: false,
            optionsList: []
        };
    }

    componentDidMount() {
        // Add Event Listner to handle the click that happens outside
        // the Custom Select Container
        document.addEventListener("mousedown", this.handleClickOutside);
        this.setState({
            defaultSelectText: this.props.defaultText
        });
    }

    componentWillUnmount() {
        // Remove the event listner on component unmounting
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    // This method handles the click that happens outside the
    // select text and list area
    handleClickOutside = e => {
        if (
            !e.target.classList.contains("custom-select-option") &&
            !e.target.classList.contains("selected-text")
        ) {
            this.setState({
                showOptionList: false
            });
        }
    };

    // This method handles the display of option list
    handleListDisplay = () => {
        this.setState(prevState => {
            return {
                showOptionList: !prevState.showOptionList
            };
        });
    };

    // This method handles the setting of name in select text area
    // and list display on selection
    handleOptionClick = e => {
        this.setState({
            defaultSelectText: e.target.getAttribute("data-name"),
            showOptionList: false
        });
    };

    render() {
        const { optionsList, defaultSelectText } = this.props;
        const { showOptionList } = this.state;
        return (
            <div className="custom-select-container">
                <div
                    className={showOptionList ? "selected-text" : "selected-text my_active"}
                    onClick={this.handleListDisplay}
                >
                    {defaultSelectText}
                </div>
                {showOptionList && (
                    <ul className="select-options">
                        {optionsList.map(option => {
                            return (
                                <li
                                    className="custom-select-option"
                                    data-name={option.accountNumber}
                                    key={option.accountNumber}
                                    onClick={this.handleOptionClick}
                                >
                                    {option.accountNumber} {option.currency}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        );
    }
}

export default CustomSelect;
