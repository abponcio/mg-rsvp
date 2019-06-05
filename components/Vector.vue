<template>

   <!-- eslint-disable-next-line vue/no-v-html -->
   <span class="inline-block" v-html="src" v-on="$listeners" v-once></span>

</template>

<script>

   export default {

       methods: {

           applyClass() {

               const allowed = [/fill-current/, /h-.+/, /text-.+/, /w-.+/];

               let classes = [...this.$el.classList].filter(c => allowed.some(regex => regex.test(c)));

               if (this.svgClass)
                   classes = classes.concat(this.svgClass.split(' ').filter(c => allowed.some(regex => regex.test(c))));

               while (this.$el.firstChild.classList.length > 0)
                   this.$el.firstChild.classList.remove(this.$el.firstChild.classList[0]);

               this.$el.firstChild.classList.add(...classes);

               if (this.customFill) {

                   this.$el.firstChild.style.fill = this.customFill;
               }
               else
                   this.$el.firstChild.classList.add('fill-current'); // For now, just do it automatically.
           },
       },
       mounted() {

           this.applyClass();
       },
       props: [

           'alt',
           'customFill',
           'src',
           'svgClass',
       ],
       watch: {

           svgClass() {

               this.applyClass();
           },
       },
   };

</script>