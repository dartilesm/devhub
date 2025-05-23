alter table "public"."users" drop constraint "users_clerk_user_id_key";

drop function if exists "public"."get_direct_replies"(target_id uuid);

drop function if exists "public"."toggle_reaction"(input_post_id uuid, input_user_id text, input_reaction_type text);

drop index if exists "public"."users_clerk_user_id_key";

CREATE TRIGGER trigger_decrement_reply_count AFTER DELETE ON public.posts FOR EACH ROW WHEN ((old.parent_post_id IS NOT NULL)) EXECUTE FUNCTION decrement_reply_count();

CREATE TRIGGER trigger_decrement_repost_count AFTER DELETE ON public.posts FOR EACH ROW WHEN ((old.repost_post_id IS NOT NULL)) EXECUTE FUNCTION decrement_repost_count();

CREATE TRIGGER trigger_increment_reply_count AFTER INSERT ON public.posts FOR EACH ROW WHEN ((new.parent_post_id IS NOT NULL)) EXECUTE FUNCTION increment_reply_count();

CREATE TRIGGER trigger_increment_repost_count AFTER INSERT ON public.posts FOR EACH ROW WHEN ((new.repost_post_id IS NOT NULL)) EXECUTE FUNCTION increment_repost_count();


