<template>
  <div>
    <div class="columns">
      <div class="column col-12">
        <Breadcrumb/>
      </div>
      <div class="column col-12">
        <h1>{{this.$route.params.inputFormat}} to {{this.$route.params.outputFormat}}</h1>
        <p>Convert {{input}} files to {{output}}</p>
        <div class="viewBox">
          <div class="viewBoxInner">
            <!--<h1>Options</h1>
            <p>
              trololo
            </p>-->
            <h1>File Upload</h1>

            <form id="conversionForm" method="post" name="conversionForm" enctype="multipart/form-data">
              <div id="fileInput">
				<span><strong id="lang_selectfile">Select file to convert</strong><br/><br/><br/>
				<input type="file" id="fileToConvert" name="fileToConvert"><br><br></span>
              </div>
            </form>
            <button v-on:click="convert" class="btn btn-primary">Convert</button>
          </div>
        </div>
      </div>
    </div>  
  </div> 
</template>

<script>
// @ is an alias to /src
import Breadcrumb from "@/components/Breadcrumb.vue";

export default {
  name: "conversion-options",
  components: {
    Breadcrumb
  },
    methods: {
      convert: function() {
          console.log("Call " + this.href)
      }
    },
    computed: {
        input () {
            return this.$store.getters.input(this.$route.params.inputFormat).label
        },
        output () {
            for(let output of this.$store.getters.outputs(this.$route.params.inputFormat)) {
                if(output.id === this.$route.params.outputFormat)
                    return output.label
            }
            return 'Unknown'
        },
        href () {
            for(let output of this.$store.getters.outputs(this.$route.params.inputFormat)) {
                if(output.id === this.$route.params.outputFormat)
                    return output.href
            }
            return '#'
        }
    }
};
</script>

<style scoped lang="scss">
  .viewBox {
    background-color: #f5f5f5;
    border: .5px solid #999999;
    border-radius: 3px;
    padding: 2rem;
  }
  
  .viewBoxInner {
    background-color: #ffffff;
    padding: 1rem;
  }
</style>