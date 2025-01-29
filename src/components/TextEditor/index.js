import React, { Component } from 'react';
import { EditorState, ContentState, convertToRaw, convertFromHTML } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import styles from "./texteditor.module.scss"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


class TextEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty(),
        };
    }
    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };
    render() {

        const { ...rest } = this.props
        const { errors, setValue, name } = rest
        const { editorState } = this.state;
        return (
            <div className={styles.text_editor}>
                <p className={styles.lable}>Enter Privacy & Policy</p>
                <Editor
                    onChange={(e) => setValue('description', e.blocks[0].text)}
                    editorState={editorState}
                    wrapperClassName={styles.wrapper}
                    editorClassName={styles.editor}
                    onEditorStateChange={this.onEditorStateChange}
                />
                {errors[name] && <span>{errors[name].message}</span>}
            </div>
        )
    }
}
// export default React.forwardRef((props, ref) => < TextEditor innerRef={ref} {...props} />)
export default TextEditor