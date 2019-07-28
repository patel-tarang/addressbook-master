<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Session\Session;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Form\Extension\Core\Type\FileType;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;
use AppBundle\Entity\Contacts;

class DefaultController extends Controller{
    /**
     * @Route("", name="homepage")
     */
    public function indexAction(Request $request){
        return $this->render('default/index.html.twig', [
            'base_dir' => realpath($this->getParameter('kernel.project_dir')).DIRECTORY_SEPARATOR,
        ]);
    }
    /**
     * @Route("/ajaxcontactsdata", name="home_ajaxcontactsdata")
     */
    public function getAjaxContactsData() {
        $request = Request::createFromGlobals();
        $filter_data = "1=1";
        if ($request->request->get('first_name')) {
            $filter_data .= " AND first_name LIKE '%" . $request->request->get('first_name') . "%'";
        }
        if ($request->request->get('last_name')) {
            $filter_data .= " AND last_name LIKE '%" . $request->request->get('last_name') . "%'";
        }
        if ($request->request->get('email')) {
            $filter_data .= " AND email LIKE '%" . $request->request->get('email') . "%'";
        }
        if ($request->request->get('phone_number')) {
            $filter_data .= " AND phone_number LIKE '%" . $request->request->get('phone_number') . "%'";
        }
        if ($request->request->get('city')) {
            $filter_data .= " AND city LIKE '%" . $request->request->get('city') . "%'";
        }
        $em = $this->getDoctrine()->getManager();
        $prdSql = "SELECT id, first_name, last_name, email, phone_number, city, birth_date FROM contacts 
                   WHERE " . $filter_data . " ORDER BY id DESC";
        $statement = $em->getConnection()->prepare($prdSql);
        $statement->execute();
        $Contacts = $statement->fetchAll();
        $i = 0;
        $iTotalRecords = count($Contacts);
        //$iDisplayLength = intval($_REQUEST['length']);
        $iDisplayLength = 10;
        if ($request->request->get('length')) {
            $iDisplayLength = $request->request->get('length');
        }
        $iDisplayLength = $iDisplayLength < 0 ? $iTotalRecords : $iDisplayLength;
        $iDisplayStart = intval($_REQUEST['start']);
        $sEcho = intval($_REQUEST['draw']);
        $records = array();
        $records["data"] = array();
        $end = $iDisplayStart + $iDisplayLength;
        $end = $end > $iTotalRecords ? $iTotalRecords : $end;
        $ActLink = "";
        for ($i = $iDisplayStart; $i < $end; $i++) {
            $ContactId          = $Contacts[$i]['id'];
            $ContactFirstName   = $Contacts[$i]['first_name'];
            $ContactLastName    = $Contacts[$i]['last_name'];
            $ContactEmail       = $Contacts[$i]['email'];
            $ContactPhone       = $Contacts[$i]['phone_number'];
            $ContactCity        = $Contacts[$i]['city'];
            $BirthDate          = $Contacts[$i]['birth_date'];
            $chkbox  = '<label class="mt-checkbox mt-checkbox-single mt-checkbox-outline"><input name="cat_id[]" type="checkbox" class="rowcheckbox checkboxes" value="' . $ContactId . '"/><span></span></label>';
            $dellink = '<a href="javascript:void(0);" title="Delete Contact" data-id="' . $ContactId . '" class="delonerows"><i class="fa fa-trash-o" style="margin-right:10px;"></i></a>';
            $ActLink = '<a href="editcontact/' . base64_encode($ContactId) . '" title="Edit Contact"><i class="fa fa-edit fafont" style="margin-right:10px;"></i></a>' . $dellink;
            $records["data"][] = array(
                $chkbox,
                $ContactFirstName,
                $ContactLastName,
                $ContactEmail,
                $ContactPhone,                
                $ContactCity,
                $BirthDate,
                $ActLink . '<a href="details/' . base64_encode($ContactId) . '" title="View Contact Details"><i class="fa fa-eye fafont"></i></a>',
            );
        }

        $records["draw"] = $sEcho;
        $records["recordsTotal"] = $iTotalRecords;
        $records["recordsFiltered"] = $iTotalRecords;

        echo json_encode($records);
        exit;
    }
    /**
     * @Route("addcontact", name="contact_new")
     */
    public function newAction(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $contact = new Contacts();
        $ContactInfo  = $this->createFormBuilder($contact)
            ->add('firstName', TextType::class, array('label' => 'First Name','data_class' => null,'required'=>true))
            ->add('lastName', TextType::class, array('label' => 'Last Name','data_class' => null,'required'=>true))
            ->add('streetNumber', TextType::class, array('label' => 'Street Number','data_class' => null,'required'=>true))
            ->add('street', TextType::class, array('label' => 'Street','data_class' => null,'required'=>true))
            ->add('zipcode', TextType::class, array('label' => 'Zipcode','data_class' => null,'required'=>true))
            ->add('email', TextType::class, array('label' => 'Email-Id','data_class' => null,'required'=>true))
            ->add('phoneNumber', TextType::class, array('label' => 'Contact','data_class' => null,'required'=>true))
            ->add('city', TextType::class, array('label' => 'City','data_class' => null,'required'=>true))
            ->add('country', TextType::class, array('label' => 'Country','data_class' => null,'required'=>true))
            ->add('birthDate', TextType::class, array('label' => 'Birth Date','data_class' => null,'required'=>true))
            ->add('profilePicture', FileType::class, array('label' => 'Profile Picture','data_class' => null,'required'=>false))
            ->getForm();
        $ContactInfo->handleRequest($request);
        $imageDir = $this->container->getParameter('kernel.root_dir') . '/../web/assets/uploads/';
        if ($ContactInfo->isSubmitted()) {
            $form_data  = $request->request->get('form');
            if (!empty($request->files->get('form')['profilePicture'])) {
                /* Profile Image */
                $profile_image = $contact->getProfilePicture();
                $ext = $profile_image->guessExtension();
                $new_file_name = time() . '.' . $profile_image->guessExtension();
                $profile_image->move($imageDir, $new_file_name);
                $contact->setProfilePicture($new_file_name);
            }
            $em->persist($contact);
            $em->flush();
            $this->addFlash('success','Contact added successfully');
            return $this->redirectToRoute('homepage');
        }
        return $this->render("default/new.html.twig", array(
            'ContactInfo'=>$ContactInfo->createView(),
        ));
    }
    /**
     * @Route("deletecontacts", name="contact_deletecontacts")
     */
    public function deletecontacts(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $ConId = $request->get('conid');
        $ConId = explode(',', $ConId);
        $cnt = 0;
        $imageDir = $this->container->getParameter('kernel.root_dir') . '/../web/assets/uploads/';
        for ($i = 0; $i < count($ConId); $i++) {
            $old_image = "";
            $FildId = $ConId[$i];
            $contact = $em->getRepository('AppBundle:Contacts')->find($FildId);
            if (!empty($contact)) {
                if(!empty($contact->getProfilePicture())){
                    $old_image = $contact->getProfilePicture();
                    if (!empty($old_image) && file_exists($imageDir . $old_image)) {
                        unlink($imageDir . $old_image);
                    }
                }
                $em->remove($contact);
                $em->flush();
                $cnt++;
            }
        }
        if ($cnt > 0) {
            echo 1;exit;
        } else {
            echo 0;exit;
        }
    }
    /**
     * @Route("deleteonecontact", name="contact_deleteoneconatact")
     */
    public function deleteoneconatact(Request $request) {
        $em = $this->getDoctrine()->getManager();
        $ConId = $request->get('conid');
        $contact = $em->getRepository('AppBundle:Contacts')->find($ConId);
        $old_image = "";
        if (!empty($contact)) {
            $imageDir = $this->container->getParameter('kernel.root_dir') . '/../web/assets/uploads/';
            if(!empty($contact->getProfilePicture())){
                $old_image = $contact->getProfilePicture();
                if (!empty($old_image) && file_exists($imageDir . $old_image)) {
                    unlink($imageDir . $old_image);
                }
            }
            $em->remove($contact);
            $em->flush();
            echo 1;exit;
        } else {
            echo 0;exit;
        }
    }
    /**
     * @Route("editcontact/{id}", name="contact_edit")
     */
    public function editAction(Request $request) {
        $conId = "";
        $old_image = "";
        $conId = $request->attributes->get('id');
        $em = $this->getDoctrine()->getManager();
        if(!empty($conId)){
            $ContactId = base64_decode($conId);
            $contact = $em->getRepository('AppBundle:Contacts')->find($ContactId);
            if(empty($contact)){
                return $this->redirectToRoute('homepage');
            }
            if(!empty($contact->getProfilePicture())){
                $old_image = $contact->getProfilePicture();
            }
        }else{
            return $this->redirectToRoute('homepage');
        }
        $ContactInfo  = $this->createFormBuilder($contact)
            ->add('firstName', TextType::class, array('label' => 'First Name','data_class' => null,'required'=>true))
            ->add('lastName', TextType::class, array('label' => 'Last Name','data_class' => null,'required'=>true))
            ->add('streetNumber', TextType::class, array('label' => 'Street Number','data_class' => null,'required'=>true))
            ->add('street', TextType::class, array('label' => 'Street','data_class' => null,'required'=>true))
            ->add('zipcode', TextType::class, array('label' => 'Zipcode','data_class' => null,'required'=>true))
            ->add('email', TextType::class, array('label' => 'Email-Id','data_class' => null,'required'=>true))
            ->add('phoneNumber', TextType::class, array('label' => 'Contact','data_class' => null,'required'=>true))
            ->add('city', TextType::class, array('label' => 'City','data_class' => null,'required'=>true))
            ->add('country', TextType::class, array('label' => 'Country','data_class' => null,'required'=>true))
            ->add('birthDate', TextType::class, array('label' => 'Birth Date','data_class' => null,'required'=>true))
            ->add('profilePicture', FileType::class, array('label' => 'Profile Picture','data_class' => null,'required'=>false))
            ->getForm();
        $ContactInfo->handleRequest($request);
        $imageDir = $this->container->getParameter('kernel.root_dir') . '/../web/assets/uploads/';
        if ($ContactInfo->isSubmitted()) {
            $form_data  = $request->request->get('form');
            if (!empty($request->files->get('form')['profilePicture'])) {
                if (!empty($old_image) && file_exists($imageDir . $old_image)) {
                    unlink($imageDir . $old_image);
                }
                /* Profile Image */
                $profile_image = $contact->getProfilePicture();
                $ext = $profile_image->guessExtension();
                $new_file_name = time() . '.' . $profile_image->guessExtension();
                $profile_image->move($imageDir, $new_file_name);
                $contact->setProfilePicture($new_file_name);
            }else{
                $contact->setProfilePicture($old_image);
            }
            $em->persist($contact);
            $em->flush();
            $this->addFlash('success','Contact updated successfully');
            return $this->redirectToRoute('homepage');
        }
        return $this->render("default/edit.html.twig", array(
            'ContactInfo'=>$ContactInfo->createView(),
            'contact'=>$contact,
        ));
    }
    /**
     * @Route("details/{id}", name="contact_details")
     */
    public function detailsAction(Request $request){
        $conId = "";
        $conId = $request->attributes->get('id');
        $em = $this->getDoctrine()->getManager();
        if(!empty($conId)){
            $ContactId = base64_decode($conId);
            $contact = $em->getRepository('AppBundle:Contacts')->find($ContactId);
            if(empty($contact)){
                return $this->redirectToRoute('homepage');
            }
        }else{
            return $this->redirectToRoute('homepage');
        }
        return $this->render("default/details.html.twig", array(
            'contact'=>$contact,
        ));
    }
}