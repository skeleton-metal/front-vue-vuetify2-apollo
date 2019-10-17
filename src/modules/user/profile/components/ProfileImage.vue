<template>
    <div>
        <profile-avatar v-on:avatarClick="pickFile"></profile-avatar>

        <v-form ref="form" autocomplete="off" v-model="valid">
            <input type="file" style="display: none" ref="img" accept="image/*" @change="onFilePicked"/>

            <v-alert :value="errors.img.length?true:false" color="error" icon="warning" outline>
                <ul>
                    <li v-for="(error,i) in errors.img" :key="i">
                        {{error}}
                    </li>
                </ul>
            </v-alert>

        </v-form>
    </div>

</template>

<script>
    import {mapActions} from 'vuex'
    import ProfileAvatar from './ProfileAvatar'

    export default {
        name: "ProfileImage",
        components: {ProfileAvatar},
        props: {
            me: Object
        },
        data: () => ({
            valid: true,
            imageName: null,
            errors: {
                img: []
            },
            img: null,
        }),
        methods: {
            ...mapActions(['changeAvatar']),
            pickFile() {
                this.$refs.img.click()
            },
            resetValidation: function () {
                this.valid = true
                this.errors = {
                    img: []
                }
            },
            onFilePicked: function (e) {

                this.img = e.target.files[0]
                this.imageName = this.img
                this.resetValidation()
                if (this.$refs.form.validate()) {
                    this.changeAvatar(this.img)
                }
            },
        }
    }
</script>

<style scoped>

</style>