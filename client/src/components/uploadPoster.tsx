import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';
import { RcFile, UploadChangeParam } from 'antd/lib/upload';
import { UploadFile } from 'antd/lib/upload/interface';



interface uploadProps {
    value?: string,
    onChange?: (imageUrl: string) => void
}
interface uploadState {
    loading: boolean,

}

export default class uploadPoster extends Component<uploadProps, uploadState> {

    state = {
        loading: false,
    };

    beforeUpload = (file: RcFile) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        this.setState({ loading: true });
        return isJpgOrPng && isLt2M;
    }

    handleChange: (info: UploadChangeParam<UploadFile<any>>) => void = (info) => {
        // console.log(info)
        if (info.file.status === 'done') {
            if (info.file.response.err) {
                message.error("上传失败")
            } else {
                this.setState({
                    loading: false
                });
                this.props.onChange && this.props.onChange(info.file.response.data)
            }

        }

    };
    render() {
        const uploadButton = (
            <div>
                {this.state.loading ? <Icon type="loading" /> : <Icon type="plus" />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div>
                <Upload
                    name="imgname"
                    listType="picture-card"
                    showUploadList={false}
                    action="/api/upload"
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {this.props.value ? <img src={this.props.value} alt="poster" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </div>
        )
    }
}
