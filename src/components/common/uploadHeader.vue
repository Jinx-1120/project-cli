<template>
    <el-upload
            v-loading="loading"
            class="avatar-uploader"
            :action="action"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-change="changeHeader"
            :on-progress="uploadProgress"
            :headers="headers"
            :on-error="uploadError">
        <user-avatar v-if="imageUrl" :cursor="true" :src="imageUrl"></user-avatar>
        <template v-else>
            <p class="avatar-uploader-icon">
                <i class="el-icon-plus"></i>
            </p>
            <div class="apTips" v-if="avatarTips">
                蓝底1寸照<br>
                (413 * 295像素)
            </div>
        </template>
    </el-upload>
</template>

<style lang="scss">
    .avatar-uploader {
        width: 100%;
        height: 100%;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        .el-upload.el-upload--text {
            display: block;
            height: 100%;
        }
        .apTips {
            width: 100%;
            line-height: 20px;
            text-align: center;
            position: absolute;
            left: 0;
            bottom: 20px;
        }
    }

    .avatar-uploader:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        text-align: center;
        i {
            margin-top: 46%;
        }
    }

    .uploadBookLogo {
        .avatar-uploader-icon i {
            margin-top: 0;
        }
    }

    .avatarBox {
        width: 100%;
        height: 100%;
    }

    .avatar {
        width: 100%;
        display: block;
    }
</style>

<script>
    import config from '../../config/config.js';
    import userAvatar from './userAvatar.vue'; // 用户头像
    export default {
        props: ["actionUrl", "imgFile", 'avatarTips', 'show'],
        data() {
            return {
                imageUrl: '',
                action: "/file/uploadImg",
                loading: false,
                headers: ''
            };
        },
        created() {
            if (typeof this.actionUrl != "undefined") {
                this.action = this.actionUrl;
            }
            this.action = config.ajaxUrl + this.action;
            if (typeof this.imgFile != "undefined") {
                this.imageUrl = this.imgFile;
            }
            this.headers = {
                "Token": this.$util.getCookie("Token")
            }
        },
        watch: {
            imgFile(val) {
                this.imageUrl = val;
            }
        },
        methods: {
            init() {

            },

            /*
             * 上传成功后处理
             * */
            handleAvatarSuccess(res, file) {
                this.setUploadHeaderLoading(false);
                if (res.status && res.status.code != 0) {
                    this.errorMess(res.status.msg);
                    return
                }
                this.imageUrl = URL.createObjectURL(file.raw);
                this.$emit("upladSuccess", res.data, this.imageUrl);
            },


            /*
             * 上传前校验
             * */
            beforeAvatarUpload(file) {
                const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png') || (file.type === 'image/gif');
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG) {
                    this.$Notice.warning({
                        title: '只能上传图片',
                        desc: '格式为: JPG、png、gif 格式!'
                    });
                }
                if (!isLt2M) {
                    this.$Notice.warning({
                        title: '超出文件大小限制',
                        desc: '上传头像图片 ' + file.name + ' 太大，不能超过 2MB!'
                    });
                }
                return isJPG && isLt2M;
            },


            /*
             * 上传过程中
             * */
            uploadProgress(event, file, fileList) {
                this.setUploadHeaderLoading(true);
            },


            /*
            * 上传失败
            * */
            uploadError(err, file, fileList) {
                this.$message.error('上传失败!');
                this.setUploadHeaderLoading(false);
            },

            changeHeader(file, fileList) {
            },

            /*
             * 设置是否显示上传头像loading
             * @param flag boolean   是否显示loading
             * */
            setUploadHeaderLoading(flag) {
                this.loading = flag;
            }
        },
        components: {
            userAvatar
        }
    }
</script>
