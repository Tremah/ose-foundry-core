import OSE from "../config";
import {OSECombatant} from "../combat/combatant";

const { HandlebarsApplicationMixin } = foundry.applications.api;
const { ActorSheetV2 } = foundry.applications.sheets;

export default class OseActorSheetV2 extends HandlebarsApplicationMixin(ActorSheetV2) {
  static DEFAULT_OPTIONS = {
    classes: ["ose", "sheet", "actor", "character"],
    tag: "form",
    position: {
      width: 1100,
      height: 1000
    },
    form: {
      handler: OseActorSheetV2.#onSubmitForm,
      submitOnChange: true
    },
    window: {
      resizable: true,
      controls: [
        {
          action: 'configureActor',
          icon: 'fas fa-code',
          label: 'Character Sheet',
          ownership: 'OWNER'
        }
      ]
    }
  }

  static PARTS = {
    header: {
      template: "systems/ose-dev/src/templates/actors/partials/character-header-V2.html"
    },
    attribs_saves_skill: {
      template: "systems/ose-dev/src/templates/actors/partials/character-attributes-saves-skills-V2.html"
    },
    combat_encounter_movement: {
      template: "systems/ose-dev/src/templates/actors/partials/combat-encounter-movement-V2.html"
    },
    attack_rolls: {
      template: "systems/ose-dev/src/templates/actors/partials/attack-rolls-V2.html"
    },
    attack_matrix: {
      template: "systems/ose-dev/src/templates/actors/partials/attack-matrix-V2.html"
    }
  }

  _configureRenderOptions(options) {
    // This fills in `options.parts` with an array of ALL part keys by default
    // So we need to call `super` first
    super._configureRenderOptions(options);
  }

  async _prepareContext(options) {
    const context = await super._prepareContext(options);
    context.actor = context.document;
    context.system = context.document.system;
    console.log(context.actor);
    console.log(context.system);
    return context;
  }

  static async #onSubmitForm(event, form, formData) {
    event.preventDefault();
    await this.document.update(formData.object);

  }

}