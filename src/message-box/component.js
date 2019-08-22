// import React from 'react';
// import PropTypes from 'prop-types';
// import classnames from 'classnames';
// import Transition from '../transition';
// import SetTimeoutMixin from '../set-timeout-mixin';

// const propTypes = {
//   visible: PropTypes.bool,
//   message: PropTypes.node,
//   duration: PropTypes.number,
//   type: PropTypes.oneOf(['success', 'info', 'warning', 'error']),

//   onClose: PropTypes.func.isRequired,
//   innerRef: PropTypes.func.isRequired,
//   className: PropTypes.string,
//   children: PropTypes.node,
// };

// const defaultProps = {
//   visible: false,
//   message: '',
//   duration: 3000,
//   type: 'info',
//   iconClass: '',
//   customClass: '',
//   showClose: false,
//   verticalOffset: 20,
//   timer: null,
//   dangerouslyUseHTMLString: false,
//   center: false,
// };

// class Message extends SetTimeoutMixin {
//   constructor(props) {
//     super(props);
//     this.state = {
//       visible: false,
//     };
//     this.ref = null;
//   }

//   componentDidMount() {
//     this.setState({ visible: true });
//     this.startTimer();
//   }

//   clearTimer() {
//     this.clearTimeouts();
//   }

//   startTimer() {
//     const { duration } = this.props;
//     if (duration > 0) {
//       this.setTimeout(() => {
//         if (this.state.visible) {
//           this.close();
//         }
//       }, duration);
//     }
//   }

//   close() {
//     this.setState({ visible: false });
//   }

//   get positionStyle() {
//     return {
//       top: `${this.props.verticalOffset}px`,
//     };
//   }

//   innerRef(ref) {
//     this.props.innerRef(ref);
//   }

//   render() {
//     const {
//       type,
//       iconClass,
//       center,
//       showClose,
//       customClass,
//       message,
//       onClose,
//     } = this.props;

//     const classes = classnames(
//       'cr-message-box',
//       center && 'cr-message-box--center',
//       customClass,
//     );

//     return (
//       <Transition
//         name="down"
//         unmountOnExit
//         in={this.state.visible}
//         onExited={onClose}
//       >
//         <div className="cr-message-box__wrapper" onClick={this.handleWrapperClick}>
//           <div className={classes}>
//             <div className="cr-message-box__header">
//               <div className="cr-message-box__title">
//                 {icon && center && (
//                   <div className={classnames('cr-message-box__status', icon)} />
//                 )}
//                 <span>{title}</span>
//               </div>
//               {showClose && (
//                 <button
//                   type="button"
//                   className="cr-message-box__headerbtn"
//                   onClick={() => handleAction(distinguishCancelAndClose ? 'close' : 'cancel')}
//                 >
//                   <i class="cr-message-box__close">&times;</i>
//                 </button>
//               )}
//             </div>
//             <div className="cr-message-box__content">
//               {icon && center && message && (
//                 <div className={classnames('cr-message-box__status', icon)} />
//               )}
//               {message && <div class="cr-message-box__message">{message}</div>}
//               {showInput && (
//                 <div className="cr-message-box__input">
//                   <el-input
//                     v-model="inputValue"
//                     :type="inputType"
//                     @keydown.enter.native="handleInputEnter"
//                     :placeholder="inputPlaceholder"
//                     ref="input"></el-input>
//                   <div class="el-message-box__errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </Transition>
//     );
//   }
// }

// Message.displayName = 'Message';
// Message.propTypes = propTypes;
// Message.defaultProps = defaultProps;

// export default Message;
