<script>
  import Slider from "./inputs/Slider.svelte";
  import TextInput from "./inputs/TextInput.svelte";

  export let options = {
    "General": [
      {
        type: 'text',
        label: 'Submit',
        name: 'apiKey',
        placeholder: 'Enter your API key',
        default: ''
      }
    ],
    "Advanced": [
      {
        type: 'toggle',
        label: 'Advanced Mode',
        name: 'advancedMode',
        default: false
      },
      {
        type: 'radio',
        label: 'Select Option',
        name: 'selectOption',
        options: [
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' }
        ],
        default: 'option2'
      },
      {
        type: 'select',
        label: 'Select Mode',
        name: 'selectMode',
        options: [
          { label: 'Mode 1', value: 'mode1' },
          { label: 'Mode 2', value: 'mode2' }
        ],
        default: 'mode2'
      }
    ]
  };

  function handleInputChange(option, event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    option.value = value;
    // Here, you can call a function to persist the values, e.g., in `chrome.storage`
    console.log(`Changed ${option.name} to ${value}`);
  }
</script>

<div>
  {#each Object.entries(options) as [category, optionGroup]}
    <h3 class="text-xl font-semibold mb-2">{category} Settings</h3>

    {#each optionGroup as option}
      <div class="mb-4">
        {#if option.type === 'text'}
          <TextInput
            id={option.name}
            placeholder={option.placeholder}
            label={option.label}
            on:input={e => handleInputChange(option, e)}
            />
        {/if}

        {#if option.type === 'toggle'}
          <Slider
            id={option.name}
            text={option.label}
            checked={option.value || option.default}
            on:change={e => handleInputChange(option, e)}
            size="small"
          />
        {/if}

        {#if option.type === 'radio'}
          <fieldset>
            <legend class="block mb-1 font-semibold">{option.label}</legend>
            {#each option.options as radioOption}
              <label class="flex items-center space-x-2">
                <input
                  type="radio"
                  name={option.name}
                  value={radioOption.value}
                  checked={option.value === radioOption.value || option.default === radioOption.value}
                  on:change={e => handleInputChange(option, e)}
                />
                <span>{radioOption.label}</span>
              </label>
            {/each}
          </fieldset>
        {/if}

        {#if option.type === 'select'}
          <label class="block mb-1 font-semibold">{option.label}</label>
          <select
            class="border px-3 py-2 w-full rounded-md"
            value={option.value || option.default}
            on:change={e => handleInputChange(option, e)}
          >
            {#each option.options as selectOption}
              <option value={selectOption.value}>
                {selectOption.label}
              </option>
            {/each}
          </select>
        {/if}
      </div>
    {/each}
  {/each}
</div>
