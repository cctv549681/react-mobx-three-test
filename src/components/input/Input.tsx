import * as React from 'react';
import classNames = require('classnames') ;


function fixControlledValue(value) {
    if (typeof value === 'undefined' || value === null) {
        return '';
    }
    return value;
}
//动画效果
function onNextFrame(cb) {
    if (window.requestAnimationFrame) {
        return window.requestAnimationFrame(cb);
    }
    return window.setTimeout(cb, 1);
}
//清除动画效果
function clearNextFrameAction(nextFrameId) {
    if (window.cancelAnimationFrame) {
        window.cancelAnimationFrame(nextFrameId);
    } else {
        window.clearTimeout(nextFrameId);
    }
}


export interface InputProps {
    prefixCls?: string,
    className?: string;
    type?: string;
    id?: number | string;
    name?: string;
    value?: any;
    defaultValue?: any;
    placeholder?: string;
    size?: 'large' | 'default' | 'small';
    disabled?: boolean;
    readOnly?: boolean;
    addonBefore?: any;
    addonAfter?: any;
    onPressEnter?: any;
    onKeyDown?: any;
    onChange?: any;
    onClick?: any;
    onFocus?: any;
    onBlur?: any;
    onInput?: any;
    autoComplete?: 'on' | 'off';
    style?: any;
    prefix?: any;
    suffix?: any;
    deleteEnable?: boolean,
    onDeleteClick?: Function;
    deleteStyle?: Object

}

export default class Input extends React.Component<InputProps, any> {
    static Group: any;
    static Search: any;
    static defaultProps = {
        disabled: false,
        prefixCls: 'input',
        type: 'text',
        autosize: false,
    };

    static propTypes = {
        type: React.PropTypes.string,
        id: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number,
        ]),
        size: React.PropTypes.oneOf(['small', 'default', 'large']),
        disabled: React.PropTypes.bool,
        value: React.PropTypes.any,
        defaultValue: React.PropTypes.any,
        className: React.PropTypes.string,
        addonBefore: React.PropTypes.node,
        addonAfter: React.PropTypes.node,
        onPressEnter: React.PropTypes.func,
        onKeyDown: React.PropTypes.func,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func,
        onInput: React.PropTypes.func,
        prefix: React.PropTypes.node,
        suffix: React.PropTypes.node,
        deleteEnable: React.PropTypes.bool,
        onDeleteClick: React.PropTypes.func,
        inputFocus: React.PropTypes.bool,
        deleteStyle: React.PropTypes.object
    };

    nextFrameActionId: number;
    refs: {
        input: any;
    };

    state = {
        isFocus: false
    };

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {
        // Re-render with the new content then recalculate the height as required.
        if (this.props.value !== nextProps.value) {


            if (this.nextFrameActionId) {
                clearNextFrameAction(this.nextFrameActionId);
            }
        }
    }

    componentDidUpdate(prevProps) {
        const {props, state, refs} = this;
        const preHasPresuffix = prevProps.prefix || prevProps.suffix;
        const curHasPresuffix = props.prefix || props.suffix;
        if (state.isFocus && (preHasPresuffix !== curHasPresuffix)) {
            refs.input.focus();
        }
    }

    handleFocus = (e) => {
        const {onFocus} = this.props;
        this.setState({
            isFocus: true,
        });
        if (onFocus) {
            onFocus(e);
        }
    };

    handleBlur = (e) => {
        const {onBlur} = this.props;
        this.setState({
            isFocus: false,
        });
        if (onBlur) {
            onBlur(e);
        }
    };

    handleKeyDown = (e) => {
        const {onPressEnter, onKeyDown} = this.props;
        if (e.keyCode === 13 && onPressEnter) {
            onPressEnter(e);
        }
        if (onKeyDown) {
            onKeyDown(e);
        }
    };
    handleInput = (e) => {
        const {onInput} = this.props;
        if (onInput) {
            onInput(e);
        }
    };
    handleDeleteIcon = (e) => {
        const {onDeleteClick} = this.props;
        if (onDeleteClick) {
            onDeleteClick(e);
        }
    };

    focus() {
        this.refs.input.focus();
    }

    renderLabeledInput(children) {
        const props = this.props;

        // Not wrap when there is not addons
        if (!props.addonBefore && !props.addonAfter && !props.deleteEnable) {
            return children;
        }

        const wrapperClassName = `${props.prefixCls}`;
        const addonClassName = `${wrapperClassName}-addon`;
        const deleteClassName = `${wrapperClassName}-delete`;

        const addonBefore = props.addonBefore ? (
                <label className={addonClassName}>
                    {props.addonBefore}
                </label>
            ) : null;

        const addonAfter = props.addonAfter ? (
                <label className={addonClassName}>
                    {props.addonAfter}
                </label>
            ) : null;
        const deleteIcon = props.deleteEnable ? (
                <span className={deleteClassName}
                      style={props.deleteStyle}
                      onClick={this.handleDeleteIcon}>
                </span>
            ) : null;
        const className = classNames({
            [wrapperClassName]: true,
            inputFocus: this.state.isFocus
        });

        return (
            <div className={className}>
                {addonBefore}
                {children}
                {deleteIcon}
                {addonAfter}
            </div>
        );
    }

    renderLabeledIcon(children) {
        const {props} = this;

        if (!props.prefix && !props.suffix) {
            return children;
        }

        const prefix = props.prefix ? (
                <span className={`${props.prefixCls}-prefix`}>
        {props.prefix}
      </span>
            ) : null;

        const suffix = props.suffix ? (
                <span className={`${props.prefixCls}-suffix`}>
        {props.suffix}
      </span>
            ) : null;

        return (
            <span className={`${props.prefixCls}-preSuffix-wrapper`} style={props.style}>
        {prefix}
                {React.cloneElement(children, {style: null})}
                {suffix}
      </span>
        );
    }

    renderInput() {
        const props = Object.assign(Input.defaultProps, this.props);
        // Fix https://fb.me/react-unknown-prop
        // const otherProps = omit(this.props, [
        //   'prefixCls',
        //   'onPressEnter',
        //   'autosize',
        //   'addonBefore',
        //   'addonAfter',
        //   'prefix',
        //   'suffix',
        // ]);

        const prefixCls = props.prefixCls || "";
        if (!props.type) {
            return props.children;
        }

        const inputClassName = classNames({
            [`${props.className}-sm`]: props.size === 'small',
            [`${props.className}-lg`]: props.size === 'large',
            [props.className]: props.className
        });

        return this.renderLabeledIcon(
            <input
                readOnly={props.readOnly}
                disabled={props.disabled}
                type={props.type}
                value={props.value}
                placeholder={props.placeholder}
                className={inputClassName}
                onKeyDown={this.handleKeyDown}
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                onInput={this.handleInput}
                ref={ (ref)=>this.refs.input = ref }
            />
        );
    }

    render() {
        return this.renderLabeledInput(this.renderInput());
    }
}
