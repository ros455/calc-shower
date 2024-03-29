import { Router } from "express";
import * as CosmeticMirrorsController from '../controller/CosmeticMirrorsController.js';

const router = new Router();

router.post('/create-cosmetic-mirrors',CosmeticMirrorsController.create);
router.get('/get-all-cosmetic-mirrors',CosmeticMirrorsController.getAll);

router.delete('/remove-cosmetic-mirrors-processing-cutout',CosmeticMirrorsController.removeProcessingСutout);
router.patch('/add-new-cosmetic-mirrors-processing-cutout',CosmeticMirrorsController.addNewProcessingСutout);
router.patch('/update-cosmetic-mirrors-processing-cutout',CosmeticMirrorsController.updateProcessingСutout);

router.patch('/update-cosmetic-mirrors-type',CosmeticMirrorsController.updateType);
router.delete('/remove-cosmetic-mirrors-type',CosmeticMirrorsController.removeType);
router.patch('/add-new-cosmetic-mirrors-type',CosmeticMirrorsController.addNewType);
router.patch('/update-cosmetic-mirrors-type-image',CosmeticMirrorsController.upload.single('mirrorsImage'),CosmeticMirrorsController.updateTypeImage);

router.patch('/update-cosmetic-mirrors-size',CosmeticMirrorsController.updateSize);

router.patch('/update-cosmetic-mirrors-light-bulbs',CosmeticMirrorsController.updateLightBulbs);

router.patch('/update-cosmetic-mirrors-patron',CosmeticMirrorsController.updatePatron);

router.patch('/update-client-cosmetic-mirrors-type',CosmeticMirrorsController.updateClientType);
router.delete('/remove-client-cosmetic-mirrors-type',CosmeticMirrorsController.removeClientType);
router.patch('/add-new-client-cosmetic-mirrors-type',CosmeticMirrorsController.addNewClientType);
router.patch('/update-client-cosmetic-mirrors-type-image',CosmeticMirrorsController.upload.single('mirrorsImage'),CosmeticMirrorsController.updateClientTypeImage);

//-------------Telegramm

router.post('/send-data-client-cosmetic-mirrors-to-telegramm',CosmeticMirrorsController.gettingOrderAndSendToTelegramm);
router.post('/send-data-manager-cosmetic-mirrors-to-telegramm',CosmeticMirrorsController.managerGettingOrderAndSendToTelegramm);

export default router;