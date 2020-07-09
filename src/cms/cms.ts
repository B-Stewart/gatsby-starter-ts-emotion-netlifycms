// src/cms/cms.js

import cms from "netlify-cms-app";
import { Widget as IdWidget } from "@ncwidgets/id";

cms.registerWidget({ globalStyles: undefined, ...IdWidget });
cms.init();
