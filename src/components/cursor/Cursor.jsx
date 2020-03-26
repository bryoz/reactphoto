import React from "react";
// import TweenMax from "gsap/TweenMax";

import styles from "./Cursor.module.scss"
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

class Cursor extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            x: -100,
            y: -100
        };
    }

    componentDidMount() {
        window.addEventListener("mousemove", e => {
            this.setState(() => {
                return {
                    x: e.clientX,
                    y: e.clientY
                }
            });
        });
    }

    componentWillUnmount() {
        window.removeEventListener("mousemove");
    }

    render() {

        return (
            <div>
                <p>position: {this.state.x}, {this.state.y}</p>
                <div className={styles.wrapper} style={{transform: `translate(${this.state.x}px, ${this.state.y}px)`}}>
					<div className={cx("customCursor", "customCursor__outer")}>
						<div className={cx("customCursor", "customCursor__inner")}></div>
					</div>
				</div>
            </div>
        );
    }
}

export default Cursor;